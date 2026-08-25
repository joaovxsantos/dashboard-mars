'use client';

import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { Badge, Checkbox, Input } from 'design-system-mars';
import { Main } from '../Main/Main';
import { TableSection, TableColumn } from '../TableSection/TableSection';
import { orders as initialOrders, statusBadgeVariant, formatPrice } from '@/src/constants/orders';
import { Order } from '@/src/interface';
import styles from './Orders.module.scss';

const PAGE_SIZE = 4;
type SortDirection = 'asc' | 'desc';

export function Orders() {
    const [orderList] = useState<Order[]>(initialOrders);
    const [search, setSearch] = useState('');
    const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
    const [page, setPage] = useState(1);
    const [selected, setSelected] = useState<Set<string>>(new Set());

    const filteredOrders = useMemo(() => {
        const query = search.trim().toLowerCase();

        const filtered = orderList.filter((order) => {
            return (
                !query ||
                order.orderNumber.toLowerCase().includes(query) ||
                order.customer.toLowerCase().includes(query)
            );
        });

        return filtered.sort((a, b) =>
            sortDirection === 'asc' ? a.total - b.total : b.total - a.total
        );
    }, [orderList, search, sortDirection]);

    const totalPages = Math.max(1, Math.ceil(filteredOrders.length / PAGE_SIZE));
    const currentPage = Math.min(page, totalPages);
    const paginatedOrders = filteredOrders.slice(
        (currentPage - 1) * PAGE_SIZE,
        currentPage * PAGE_SIZE
    );

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

    const columns: TableColumn<Order>[] = [
        {
            key: 'orderNumber',
            header: 'Pedido',
            render: (order) => <strong>{order.orderNumber}</strong>,
        },
        {
            key: 'customer',
            header: 'Cliente',
            render: (order) => order.customer,
        },
        {
            key: 'status',
            header: 'Status',
            render: (order) => (
                <Badge variant={statusBadgeVariant[order.status]}>{order.status}</Badge>
            ),
        },
        {
            key: 'total',
            header: 'Total',
            sortable: true,
            sortDirection,
            onSort: toggleSort,
            render: (order) => <span className={styles.total}>{formatPrice(order.total)}</span>,
        }
    ];

    return (
        <Main title="Pedidos">
            <div className={styles.page}>
                <p className={styles.subtitle}>{orderList.length} pedidos este mês</p>

                <div className={styles.toolbar}>
                    <div className={styles.search}>
                        <Input
                            placeholder="Buscar..."
                            icon={<Search size={16} />}
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value);
                                setPage(1);
                            }}
                        />
                    </div>
                </div>

                <TableSection
                    columns={columns}
                    data={paginatedOrders}
                    keyExtractor={(order) => order.id}
                    resultsLabel={`${filteredOrders.length} resultados`}
                    emptyMessage="Nenhum pedido encontrado."
                    page={currentPage}
                    totalPages={totalPages}
                    onPageChange={setPage}
                />
            </div>
        </Main>
    )
}
