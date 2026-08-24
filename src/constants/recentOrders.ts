export const recentOrders = [
  {
    orderNumber: "#00101",
    price: "R$ 250,00",
    status: "Completed",
  },
  {
    orderNumber: "#00102",
    price: "R$ 150,50",
    status: "Pending",
  },
  {
    orderNumber: "#00103",
    price: "R$ 320,00",
    status: "Shipped",
  },
];

export const statusColors: Record<
  string,
  "default" | "accent" | "success" | "danger"
> = {
  Completed: "success",
  Pending: "accent",
  Shipped: "default",
  Cancelled: "danger",
};
