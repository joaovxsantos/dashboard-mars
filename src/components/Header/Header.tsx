'use client';
import { Button, ThemeToggle } from 'design-system-mars';
import styles from './Header.module.scss';
import { useIsMobile } from "design-system-mars/src/hooks/isMobile";
import { MenuIcon, X } from 'lucide-react'
import { useState } from 'react';
import { NAV_LINKS } from '@/src/constants/navigation';
import Link from 'next/link';
import { usePathname } from 'next/navigation';


export function Header() {
    const isMobile = useIsMobile();
    const pathName = usePathname();
    const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false);

    const actionMenu = () => {
        setMenuIsOpen(prev => !prev)
    }

    return (
        <header className={styles["header-container"]}>
            <h1 className={styles.title}>DS MARS ADMIN</h1>
            {
                isMobile ?
                    <>
                        <Button variant='secondary' onClick={actionMenu}>
                            <MenuIcon className={styles["icon"]} />
                        </Button>
                        <div className={`${styles["header-content"]} ${menuIsOpen && styles.open}`}>
                            <nav className={styles["nav-container"]}>
                                <div className={styles["nav-head"]}>
                                    <h2>MARS</h2>
                                    <Button variant='secondary' onClick={actionMenu}>
                                        <X className={styles["icon"]} />
                                    </Button>
                                </div>
                                <ul>
                                    {
                                        NAV_LINKS.map(({ label, href }) => {
                                            return (
                                                <Link href={href} key={href}>
                                                    <li className={`${pathName === href && styles.active}`} onClick={actionMenu}>{label}</li>
                                                </Link>
                                            )
                                        })
                                    }
                                    <ThemeToggle className={styles["btn-theme"]} />

                                </ul>
                                <div className={styles["theme-container"]}>
                                </div>
                            </nav>
                        </div>
                    </> :
                    <nav className={styles["nav-container"]}>
                        <ul>
                            {
                                NAV_LINKS.map(({ label, href }) => {
                                    return (
                                        <Link href={href} key={href}>
                                            <li className={`${pathName === href && styles.active}`} onClick={actionMenu}>{label}</li>
                                        </Link>
                                    )
                                })
                            }
                            <ThemeToggle className={styles["btn-theme"]} />
                        </ul>
                    </nav>
            }
        </header>
    )
}