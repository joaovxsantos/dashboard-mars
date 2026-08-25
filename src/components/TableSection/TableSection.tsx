'use client';

import { ReactNode } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { Button } from 'design-system-mars';
import styles from './TableSection.module.scss';

export interface TableColumn<T> {
    key: string;
    header: ReactNode;
    render: (item: T) => ReactNode;
    className?: string;
    sortable?: boolean;
    sortDirection?: 'asc' | 'desc';
    onSort?: () => void;
}

export interface TableSectionProps<T> {
    columns: TableColumn<T>[];
    data: T[];
    keyExtractor: (item: T) => string;
    resultsLabel: ReactNode;
    emptyMessage?: string;
    page: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export function TableSection<T>({
    columns,
    data,
    keyExtractor,
    resultsLabel,
    emptyMessage = 'Nenhum resultado encontrado.',
    page,
    totalPages,
    onPageChange,
}: TableSectionProps<T>) {
    return (
        <div className={styles["table-section"]}>
            <div className={styles["results-row"]}>
                <span>{resultsLabel}</span>
            </div>

            <div className={styles["table-wrapper"]}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            {columns.map((column) => (
                                <th
                                    key={column.key}
                                    className={[column.sortable ? styles.sortable : '', column.className]
                                        .filter(Boolean)
                                        .join(' ')}
                                    onClick={column.sortable ? column.onSort : undefined}
                                >
                                    {column.header}
                                    {column.sortable &&
                                        (column.sortDirection === 'asc'
                                            ? <ChevronUp size={12} />
                                            : <ChevronDown size={12} />)}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item) => (
                            <tr key={keyExtractor(item)}>
                                {columns.map((column) => (
                                    <td key={column.key} className={column.className}>
                                        {column.render(item)}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>

                {data.length === 0 && <div className={styles.empty}>{emptyMessage}</div>}
            </div>

            {data.length > 0 && (
                <div className={styles.pagination}>
                    <Button
                        variant="secondary"
                        size="md"
                        disabled={page === 1}
                        onClick={() => onPageChange(Math.max(1, page - 1))}
                    >
                        Anterior
                    </Button>
                    <span>Página {page} de {totalPages}</span>
                    <Button
                        variant="secondary"
                        size="md"
                        className={styles["next-button"]}
                        disabled={page === totalPages}
                        onClick={() => onPageChange(Math.min(totalPages, page + 1))}
                    >
                        Próxima
                    </Button>
                </div>
            )}
        </div>
    );
}
