'use client';

import { useMemo, useState } from 'react';
import { Search, Plus, Trash2 } from 'lucide-react';
import { Badge, Button, Input, Modal, Select } from 'design-system-mars';
import { Main } from '../Main/Main';
import { TableSection, TableColumn } from '../TableSection/TableSection';
import {
    products as initialProducts,
    CATEGORY_OPTIONS,
    CATEGORY_FORM_OPTIONS,
    STATUS_FORM_OPTIONS,
    statusBadgeVariant,
    formatPrice,
} from '@/src/constants/products';
import { Product, ProductStatus } from '@/src/interface';
import styles from './Products.module.scss';

const PAGE_SIZE = 5;
type SortDirection = 'asc' | 'desc';

export function Products() {
    const [productList, setProductList] = useState<Product[]>(initialProducts);
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('all');
    const [status, setStatus] = useState('all');
    const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
    const [page, setPage] = useState(1);
    const [selected, setSelected] = useState<Set<string>>(new Set());
    const [productToDelete, setProductToDelete] = useState<Product | null>(null);

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [newName, setNewName] = useState('');
    const [newSku, setNewSku] = useState('');
    const [newCategory, setNewCategory] = useState('');
    const [newStatus, setNewStatus] = useState('');
    const [newPrice, setNewPrice] = useState('');
    const [newStock, setNewStock] = useState('');
    const [formErrors, setFormErrors] = useState<Record<string, string>>({});

    const filteredProducts = useMemo(() => {
        const query = search.trim().toLowerCase();

        const filtered = productList.filter((product) => {
            const matchesSearch =
                !query ||
                product.name.toLowerCase().includes(query) ||
                product.sku.toLowerCase().includes(query);
            const matchesCategory = category === 'all' || product.category === category;
            const matchesStatus = status === 'all' || product.status === status;

            return matchesSearch && matchesCategory && matchesStatus;
        });

        return filtered.sort((a, b) =>
            sortDirection === 'asc' ? a.price - b.price : b.price - a.price
        );
    }, [productList, search, category, status, sortDirection]);

    const totalPages = Math.max(1, Math.ceil(filteredProducts.length / PAGE_SIZE));
    const currentPage = Math.min(page, totalPages);
    const paginatedProducts = filteredProducts.slice(
        (currentPage - 1) * PAGE_SIZE,
        currentPage * PAGE_SIZE
    );

    const allVisibleSelected =
        paginatedProducts.length > 0 && paginatedProducts.every((p) => selected.has(p.id));

    const columns: TableColumn<Product>[] = [
        {
            key: 'name',
            header: 'Produto',
            render: (product) => (
                <>
                    <strong>{product.name}</strong>
                    <span className={styles.sku}>{product.sku}</span>
                </>
            ),
        },
        {
            key: 'category',
            header: 'Categoria',
            render: (product) => product.category,
        },
        {
            key: 'status',
            header: 'Status',
            render: (product) => (
                <Badge variant={statusBadgeVariant[product.status]}>{product.status}</Badge>
            ),
        },
        {
            key: 'price',
            header: 'Preço',
            sortable: true,
            sortDirection,
            onSort: toggleSort,
            render: (product) => <span className={styles.price}>{formatPrice(product.price)}</span>,
        },
        {
            key: 'actions',
            header: '',
            className: styles["actions-col"],
            render: (product) => (
                <button
                    type="button"
                    className={styles["delete-button"]}
                    onClick={() => setProductToDelete(product)}
                    aria-label={`Apagar ${product.name}`}
                >
                    <Trash2 size={16} />
                </button>
            ),
        },
    ];

    function updateFilter(setter: (value: string) => void, value: string) {
        setter(value);
        setPage(1);
    }

    function toggleSort() {
        setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    }

    function toggleRow(id: string) {
        setSelected((prev) => {
            const next = new Set(prev);
            next.has(id) ? next.delete(id) : next.add(id);
            return next;
        });
    }

    function toggleAllVisible() {
        setSelected((prev) => {
            const next = new Set(prev);
            if (allVisibleSelected) {
                paginatedProducts.forEach((p) => next.delete(p.id));
            } else {
                paginatedProducts.forEach((p) => next.add(p.id));
            }
            return next;
        });
    }

    function confirmDeleteProduct() {
        if (!productToDelete) return;

        const deletedId = productToDelete.id;
        setProductList((prev) => prev.filter((p) => p.id !== deletedId));
        setSelected((prev) => {
            const next = new Set(prev);
            next.delete(deletedId);
            return next;
        });
        setProductToDelete(null);
    }

    function closeAddModal() {
        setIsAddModalOpen(false);
        setNewName('');
        setNewSku('');
        setNewCategory('');
        setNewStatus('');
        setNewPrice('');
        setNewStock('');
        setFormErrors({});
    }

    function handleAddProduct() {
        const errors: Record<string, string> = {};

        if (!newName.trim()) errors.name = 'Informe o nome do produto';
        if (!newSku.trim()) errors.sku = 'Informe o SKU';
        if (!newCategory) errors.category = 'Selecione uma categoria';
        if (!newStatus) errors.status = 'Selecione um status';

        const priceValue = Number(newPrice);
        if (!newPrice || Number.isNaN(priceValue) || priceValue < 0) {
            errors.price = 'Informe um preço válido';
        }

        const stockValue = Number(newStock);
        if (!newStock || Number.isNaN(stockValue) || stockValue < 0) {
            errors.stock = 'Informe um estoque válido';
        }

        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }

        const newProduct: Product = {
            id: crypto.randomUUID(),
            name: newName.trim(),
            category: newCategory,
            sku: newSku.trim(),
            price: priceValue,
            stock: stockValue,
            status: newStatus as ProductStatus,
        };

        setProductList((prev) => [newProduct, ...prev]);
        setPage(1);
        closeAddModal();
    }

    return (
        <Main title="Produtos">
            <div className={styles.page}>
                <p className={styles.subtitle}>{productList.length} produtos no catálogo</p>

                <div className={styles.toolbar}>
                    <div className={styles.search}>
                        <Input
                            placeholder="Buscar por nome ou SKU"
                            icon={<Search size={16} />}
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value);
                                setPage(1);
                            }}
                        />
                    </div>

                    <div className={styles.filters}>
                        <Select
                            options={CATEGORY_OPTIONS}
                            value={category}
                            onChange={(value) => updateFilter(setCategory, value)}
                            placeholder="Categoria"
                        />
                    </div>

                    <Button
                        variant="primary"
                        className={styles["add-button"]}
                        onClick={() => setIsAddModalOpen(true)}
                    >
                        <Plus size={16} />
                        Novo produto
                    </Button>
                </div>

                <TableSection
                    columns={columns}
                    data={paginatedProducts}
                    keyExtractor={(product) => product.id}
                    resultsLabel={`${filteredProducts.length} resultados`}
                    emptyMessage="Nenhum produto encontrado."
                    page={currentPage}
                    totalPages={totalPages}
                    onPageChange={setPage}
                />
            </div>

            <Modal
                isOpen={!!productToDelete}
                onClose={() => setProductToDelete(null)}
                title="Apagar produto"
            >
                <p className={styles["delete-confirm-text"]}>
                    Tem certeza que deseja apagar <strong>{productToDelete?.name}</strong>? Essa ação não pode ser desfeita.
                </p>
                <div className={styles["delete-confirm-actions"]}>
                    <Button variant="secondary" onClick={() => setProductToDelete(null)}>
                        Cancelar
                    </Button>
                    <Button variant="danger" onClick={confirmDeleteProduct}>
                        Apagar
                    </Button>
                </div>
            </Modal>

            <Modal isOpen={isAddModalOpen} onClose={closeAddModal} title="Novo produto">
                <div className={styles["add-form"]}>
                    <Input
                        id="new-product-name"
                        label="Nome"
                        placeholder="Ex: Cadeira Windsor"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        error={formErrors.name}
                    />

                    <Input
                        id="new-product-sku"
                        label="SKU"
                        placeholder="Ex: MOV-1001"
                        value={newSku}
                        onChange={(e) => setNewSku(e.target.value)}
                        error={formErrors.sku}
                    />

                    <div className={styles["add-form-row"]}>
                        <Select
                            id="new-product-category"
                            label="Categoria"
                            options={CATEGORY_FORM_OPTIONS}
                            value={newCategory}
                            onChange={setNewCategory}
                            placeholder="Selecione"
                            error={formErrors.category}
                        />

                        <Select
                            id="new-product-status"
                            label="Status"
                            options={STATUS_FORM_OPTIONS}
                            value={newStatus}
                            onChange={setNewStatus}
                            placeholder="Selecione"
                            error={formErrors.status}
                        />
                    </div>

                    <div className={styles["add-form-row"]}>
                        <Input
                            id="new-product-price"
                            label="Preço"
                            type="number"
                            min="0"
                            step="0.01"
                            placeholder="0,00"
                            value={newPrice}
                            onChange={(e) => setNewPrice(e.target.value)}
                            error={formErrors.price}
                        />

                        <Input
                            id="new-product-stock"
                            label="Estoque"
                            type="number"
                            min="0"
                            step="1"
                            placeholder="0"
                            value={newStock}
                            onChange={(e) => setNewStock(e.target.value)}
                            error={formErrors.stock}
                        />
                    </div>
                </div>

                <div className={styles["delete-confirm-actions"]}>
                    <Button variant="secondary" onClick={closeAddModal}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={handleAddProduct}>
                        Adicionar
                    </Button>
                </div>
            </Modal>
        </Main>
    )
}
