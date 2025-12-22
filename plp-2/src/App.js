import React, { useState } from "react";
import Header from "./components/Header";
import Filters from "./components/Filters";
import ProductGrid from "./components/ProductGrid";
import Footer from "./components/Footer";
import { useProducts } from "./hooks/useProducts";
import { filterProducts } from "./utils/filterProducts";
import "./App.css";

export default function App() {
  const { products, loading } = useProducts();
  const [filters, setFilters] = useState({ category: "all" });

  const visibleProducts = filterProducts(products, filters);

  return (
    <>
      <Header />
      <main className="layout">
        <Filters filters={filters} setFilters={setFilters} />
        {loading ? (
          <p className="loading">Loading products…</p>
        ) : (
          <ProductGrid products={visibleProducts} />
        )}
      </main>
      <Footer />
    </>
  );
}
