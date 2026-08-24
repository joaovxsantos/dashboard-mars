import { Main } from "../Main/Main";
import { CardResume } from "../CardResume/CardResume";
import { CardsDashInfo } from "@/src/constants/cardsdash";
import { RecentOrders } from "../RecentOrders/RecentOrders";
import { recentOrders } from "@/src/constants/recentOrders";

export function AllDash() {
    return (
        <Main title="Visão Geral">
            {CardsDashInfo.map(({ title, label, flag }) => {
                return (
                    <CardResume title={title} label={label} flag={flag} />
                )
            })}
            <RecentOrders label="PEDIDOS RECENTES" link="/products" />
            {
                recentOrders.map(({ price, orderNumber, status }) => {
                    return (
                        <RecentOrders title={orderNumber} label={price} status={status} />
                    )
                })
            }
        </Main>
    )
}