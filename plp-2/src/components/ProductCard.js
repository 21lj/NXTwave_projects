const fun = name => {
  const now = new Date();
  const fdt = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ` +
              `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;

  alert(`${name} added to cart on ${fdt}`);
}

export default function ProductCard({ product }) {
  return (
    <article className="card">
      <img
        src={product.image}
        alt={`Product ${product.title}`}
        loading="lazy"
      />
      <h3>{product.title}</h3>
      <p className="price">${product.price}</p>
      <button onClick={() => fun(product.title)}>Add to Cart</button>
    </article>
  );
}
