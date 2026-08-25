import { Product, ProductStatus } from "@/src/interface";

export const products: Product[] = [
  {
    id: "1",
    name: "Cadeira Windsor",
    category: "Móveis",
    sku: "MOV-1001",
    price: 890,
    stock: 24,
    status: "Em estoque",
  },
  {
    id: "2",
    name: "Luminária de Latão",
    category: "Iluminação",
    sku: "ILU-2003",
    price: 210,
    stock: 6,
    status: "Estoque baixo",
  },
  {
    id: "3",
    name: "Tapete Persa",
    category: "Decoração",
    sku: "DEC-3010",
    price: 1450,
    stock: 0,
    status: "Esgotado",
  },
  {
    id: "4",
    name: "Mesa de Centro",
    category: "Móveis",
    sku: "MOV-1042",
    price: 650,
    stock: 12,
    status: "Em estoque",
  },
  {
    id: "5",
    name: "Espelho Veneziano",
    category: "Decoração",
    sku: "DEC-3021",
    price: 380,
    stock: 3,
    status: "Estoque baixo",
  },
  {
    id: "6",
    name: "Poltrona de Couro",
    category: "Móveis",
    sku: "MOV-1077",
    price: 1980,
    stock: 8,
    status: "Em estoque",
  },
  {
    id: "7",
    name: "Abajur de Cerâmica",
    category: "Iluminação",
    sku: "ILU-2015",
    price: 165,
    stock: 0,
    status: "Esgotado",
  },
  {
    id: "8",
    name: "Vaso Decorativo",
    category: "Decoração",
    sku: "DEC-3033",
    price: 95,
    stock: 40,
    status: "Em estoque",
  },
  {
    id: "9",
    name: "Banqueta Industrial",
    category: "Móveis",
    sku: "MOV-1088",
    price: 320,
    stock: 15,
    status: "Em estoque",
  },
  {
    id: "10",
    name: "Pendente de Rattan",
    category: "Iluminação",
    sku: "ILU-2027",
    price: 275,
    stock: 2,
    status: "Estoque baixo",
  },
];

export const CATEGORY_OPTIONS = [
  { value: "all", label: "Todas as categorias" },
  { value: "Móveis", label: "Móveis" },
  { value: "Iluminação", label: "Iluminação" },
  { value: "Decoração", label: "Decoração" },
];

export const STATUS_OPTIONS = [
  { value: "all", label: "Todos os status" },
  { value: "Em estoque", label: "Em estoque" },
  { value: "Estoque baixo", label: "Estoque baixo" },
  { value: "Esgotado", label: "Esgotado" },
];

export const CATEGORY_FORM_OPTIONS = CATEGORY_OPTIONS.filter(
  (option) => option.value !== "all"
);

export const STATUS_FORM_OPTIONS = STATUS_OPTIONS.filter(
  (option) => option.value !== "all"
);

export const statusBadgeVariant: Record<
  ProductStatus,
  "default" | "accent" | "success" | "danger"
> = {
  "Em estoque": "success",
  "Estoque baixo": "accent",
  Esgotado: "danger",
};

export const formatPrice = (price: number) =>
  price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
