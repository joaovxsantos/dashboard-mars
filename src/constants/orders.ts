import { Order, OrderStatus } from "@/src/interface";

export const orders: Order[] = [
  { id: "1", orderNumber: "#00234", customer: "Diego Alves", status: "Entregue", total: 412 },
  { id: "2", orderNumber: "#00231", customer: "Ana Ferreira", status: "Entregue", total: 289 },
  { id: "3", orderNumber: "#00232", customer: "Bruno Costa", status: "Pendente", total: 154 },
  { id: "4", orderNumber: "#00233", customer: "Carla Nunes", status: "Cancelado", total: 78 },
  { id: "5", orderNumber: "#00230", customer: "Eduardo Lima", status: "Entregue", total: 530 },
  { id: "6", orderNumber: "#00229", customer: "Fernanda Reis", status: "Pendente", total: 96 },
  { id: "7", orderNumber: "#00228", customer: "Gabriel Souza", status: "Entregue", total: 245 },
  { id: "8", orderNumber: "#00227", customer: "Helena Martins", status: "Cancelado", total: 189 },
  { id: "9", orderNumber: "#00226", customer: "Igor Pereira", status: "Entregue", total: 670 },
  { id: "10", orderNumber: "#00225", customer: "Julia Castro", status: "Pendente", total: 132 },
];

export const STATUS_OPTIONS = [
  { value: "all", label: "Todos os status" },
  { value: "Entregue", label: "Entregue" },
  { value: "Pendente", label: "Pendente" },
  { value: "Cancelado", label: "Cancelado" },
];

export const statusBadgeVariant: Record<
  OrderStatus,
  "default" | "accent" | "success" | "danger"
> = {
  Entregue: "success",
  Pendente: "accent",
  Cancelado: "danger",
};

export const formatPrice = (price: number) =>
  price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
