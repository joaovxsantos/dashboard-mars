'use client';

import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { Checkbox, Input } from 'design-system-mars';
import { Main } from '../Main/Main';
import { TableSection, TableColumn } from '../TableSection/TableSection';
import { clients as initialClients } from '@/src/constants/clients';
import { Client } from '@/src/interface';
import styles from './Clients.module.scss';

const PAGE_SIZE = 4;
type SortDirection = 'asc' | 'desc';

export function Clients() {
    const [clientList] = useState<Client[]>(initialClients);
    const [search, setSearch] = useState('');
    const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
    const [page, setPage] = useState(1);
    const [selected, setSelected] = useState<Set<string>>(new Set());

    const filteredClients = useMemo(() => {
        const query = search.trim().toLowerCase();

        const filtered = clientList.filter((client) => {
            return (
                !query ||
                client.name.toLowerCase().includes(query) ||
                client.email.toLowerCase().includes(query)
            );
        });

        return filtered.sort((a, b) =>
            sortDirection === 'asc' ? a.orders - b.orders : b.orders - a.orders
        );
    }, [clientList, search, sortDirection]);

    const totalPages = Math.max(1, Math.ceil(filteredClients.length / PAGE_SIZE));
    const currentPage = Math.min(page, totalPages);
    const paginatedClients = filteredClients.slice(
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

    const columns: TableColumn<Client>[] = [
        {
            key: 'name',
            header: 'Nome',
            render: (client) => <strong>{client.name}</strong>,
        },
        {
            key: 'email',
            header: 'E-mail',
            render: (client) => client.email,
        },
        {
            key: 'orders',
            header: 'Pedidos',
            sortable: true,
            sortDirection,
            onSort: toggleSort,
            render: (client) => <span className={styles.orders}>{client.orders}</span>,
        },
    ];

    return (
        <Main title="Clientes">
            <div className={styles.page}>
                <p className={styles.subtitle}>{clientList.length} clientes cadastrados</p>

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
                    data={paginatedClients}
                    keyExtractor={(client) => client.id}
                    resultsLabel={`${filteredClients.length} resultados`}
                    emptyMessage="Nenhum cliente encontrado."
                    page={currentPage}
                    totalPages={totalPages}
                    onPageChange={setPage}
                />
            </div>
        </Main>
    )
}
