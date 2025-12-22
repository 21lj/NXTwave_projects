import ProductCard from "./ProductCard";

export default function ProductGrid({ products }) {
  return (
    <section className="grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </section>
  );
}
