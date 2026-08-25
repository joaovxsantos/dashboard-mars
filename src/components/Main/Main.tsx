'use client';
import { usePathname } from 'next/navigation';
import { MainProps } from '@/src/interface';
import styles from './Main.module.scss';


export function Main({ title, children }: MainProps) {
    const pathname = usePathname();

    return (
        <div key={pathname} className={styles["main-container"]}>
            <h2 className={styles["main-title"]}>{title}</h2>
            {children}
        </div>
    )
}