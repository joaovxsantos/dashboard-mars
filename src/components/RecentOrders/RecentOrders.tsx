import { RecentOrdersProps } from '@/src/interface';
import styles from './RecentOrders.module.scss';
import { Badge } from 'design-system-mars';
import { statusColors } from '@/src/constants/recentOrders';
import Link from 'next/link';

export function RecentOrders({ title, label, status, link }: RecentOrdersProps) {
    return (
        <div className={styles["recent-orders-container"]}>
            <div className={styles["left-side"]}>
                <h5>{title}</h5>
                {label && <label>{label}</label>}
            </div>
            <div>
                {status && <Badge variant={statusColors[status || '']}>{status}</Badge>}
                {link && <Link href={link || ""}>Ver todos</Link>}
            </div>
        </div>
    )
}