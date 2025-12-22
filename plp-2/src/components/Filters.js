export default function Filters({ filters, setFilters }) {
  return (
    <aside className="filters">
      <h2>Filters</h2>

      <select
        value={filters.category}
        onChange={(e) =>
          setFilters({ ...filters, category: e.target.value })
        }
      >
        <option value="all">All</option>
        <option value="men's clothing">Men</option>
        <option value="women's clothing">Women</option>
        <option value="electronics">Electronics</option>
        <option value="jewelery">Jewellery</option>
      </select>
    </aside>
  );
}
