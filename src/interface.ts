export interface MainProps {
  title: string;
  children: React.ReactNode;
}
export interface CardResumeProps {
  title: string;
  label: string;
  flag: string;
}

export interface RecentOrdersProps {
  title?: string;
  label: string;
  status?: string;
  link?: string;
}

export type ProductStatus = "Em estoque" | "Estoque baixo" | "Esgotado";

export interface Product {
  id: string;
  name: string;
  category: string;
  sku: string;
  price: number;
  stock: number;
  status: ProductStatus;
}

export type OrderStatus = "Entregue" | "Pendente" | "Cancelado";

export interface Order {
  id: string;
  orderNumber: string;
  customer: string;
  status: OrderStatus;
  total: number;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  orders: number;
}
