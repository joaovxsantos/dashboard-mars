import styles from './AllDash.module.scss';
import { Main } from "../Main/Main";
import { CardResume } from "../CardResume/CardResume";
import { CardsDashInfo } from "@/src/constants/cardsdash";
import { RecentOrders } from "../RecentOrders/RecentOrders";
import { recentOrders } from "@/src/constants/recentOrders";
import { SalesChart } from '../SalesChart/SalesChart';
import { salesChartData } from '@/src/constants/salesChart';

export function AllDash() {
    return (
        <Main title="Visão Geral">
            <div className={styles["card-dash-container"]}>
                {CardsDashInfo.map(({ title, label, flag }) => {
                    return (
                        <CardResume title={title} label={label} flag={flag} />
                    )
                })}
            </div>
            <SalesChart data={salesChartData} />
            <div>
                <RecentOrders label="PEDIDOS RECENTES" link="/orders" />
                {
                    recentOrders.map(({ price, orderNumber, status }) => {
                        return (
                            <RecentOrders title={orderNumber} label={price} status={status} />
                        )
                    })
                }
            </div>
        </Main>
    )
}