import { useState } from "react";
import ProductCard from "./ProductCard";

const categories = ["Todos", "Papelería", "Mobiliario", "Tecnología", "Organización", "Ergonomía"];

const categoryIcons = {
  Todos: "bi-grid-fill",
  Papelería: "bi-pencil-fill",
  Mobiliario: "bi-house-fill",
  Tecnología: "bi-cpu-fill",
  Organización: "bi-folder-fill",
  Ergonomía: "bi-heart-pulse-fill",
};

export default function Catalog({ products, activeCategory, onCategoryChange, onViewDetails, onAddToCart }) {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("default");

  const filtered = products
    .filter((p) => {
      const matchCat = activeCategory === "Todos" || p.categoria === activeCategory;
      const matchSearch =
        p.nombre.toLowerCase().includes(search.toLowerCase()) ||
        p.marca.toLowerCase().includes(search.toLowerCase()) ||
        p.descripcionCorta.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    })
    .sort((a, b) => {
      if (sortBy === "price-asc") return a.precio - b.precio;
      if (sortBy === "price-desc") return b.precio - a.precio;
      if (sortBy === "name") return a.nombre.localeCompare(b.nombre);
      return a.id - b.id;
    });

  return (
    <section className="py-5">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-5">
          <span className="badge bg-primary px-3 py-2 mb-2 fs-6">
            <i className="bi bi-grid-fill me-1"></i>Catálogo
          </span>
          <h2 className="fw-bold display-6">Nuestros Productos</h2>
          <p className="text-muted lead">Encuentra todo lo que necesitas para tu oficina.</p>
          <div className="mx-auto" style={{ width: 60, height: 4, background: "#0d6efd", borderRadius: 2 }} />
        </div>

        {/* Filters row */}
        <div className="row g-3 mb-4 align-items-center">
          {/* Search */}
          <div className="col-md-5">
            <div className="input-group shadow-sm">
              <span className="input-group-text bg-white border-end-0">
                <i className="bi bi-search text-muted"></i>
              </span>
              <input
                type="text"
                className="form-control border-start-0 ps-0"
                placeholder="Buscar por nombre, marca..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              {search && (
                <button className="btn btn-outline-secondary" onClick={() => setSearch("")}>
                  <i className="bi bi-x-lg"></i>
                </button>
              )}
            </div>
          </div>

          {/* Sort */}
          <div className="col-md-3">
            <select
              className="form-select shadow-sm"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="default">Ordenar por: Defecto</option>
              <option value="price-asc">Precio: Menor a mayor</option>
              <option value="price-desc">Precio: Mayor a menor</option>
              <option value="name">Nombre A–Z</option>
            </select>
          </div>

          {/* Results count */}
          <div className="col-md-4 text-md-end">
            <span className="text-muted small">
              <i className="bi bi-box-seam me-1"></i>
              {filtered.length} producto{filtered.length !== 1 ? "s" : ""} encontrado{filtered.length !== 1 ? "s" : ""}
            </span>
          </div>
        </div>

        {/* Category pills */}
        <div className="d-flex flex-wrap gap-2 mb-4">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`btn btn-sm px-3 ${activeCategory === cat ? "btn-primary" : "btn-outline-primary"}`}
              onClick={() => onCategoryChange(cat)}
            >
              <i className={`bi ${categoryIcons[cat]} me-1`}></i>
              {cat}
            </button>
          ))}
        </div>

        {/* Products grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-5 text-muted">
            <i className="bi bi-search display-3 mb-3 d-block opacity-25"></i>
            <h5>No se encontraron productos</h5>
            <p className="small">Intenta con otro término o cambia la categoría.</p>
            <button className="btn btn-outline-primary" onClick={() => { setSearch(""); onCategoryChange("Todos"); }}>
              Ver todos los productos
            </button>
          </div>
        ) : (
          <div className="row g-4">
            {filtered.map((product) => (
              <div key={product.id} className="col-sm-6 col-lg-4 col-xl-3">
                <ProductCard
                  product={product}
                  onViewDetails={onViewDetails}
                  onAddToCart={onAddToCart}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
