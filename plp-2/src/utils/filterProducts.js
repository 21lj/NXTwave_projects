export function filterProducts(products, filters) {
  if (filters.category === "all") return products;
  return products.filter((p) => p.category === filters.category);
}
