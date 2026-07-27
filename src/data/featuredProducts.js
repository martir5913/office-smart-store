import { products } from "./products";

// Productos destacados de la semana (5 seleccionados)
export const featuredProducts = products.filter((p) =>
  [7, 15, 21, 22, 25].includes(p.id)
);
