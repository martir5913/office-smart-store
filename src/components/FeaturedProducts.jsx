import ProductCard from "./ProductCard";

export default function FeaturedProducts({ products, onViewDetails, onAddToCart }) {
  return (
    <section className="py-5 bg-light">
      <div className="container">
        {/* Section header */}
        <div className="text-center mb-5">
          <span className="badge bg-warning text-dark px-3 py-2 mb-2 fs-6">
            <i className="bi bi-star-fill me-1"></i>Lo más vendido
          </span>
          <h2 className="fw-bold display-6">Productos Destacados de la Semana</h2>
          <p className="text-muted lead">
            Selección especial de los artículos más populares y mejor valorados.
          </p>
          <div className="mx-auto" style={{ width: 60, height: 4, background: "#ffc107", borderRadius: 2 }} />
        </div>

        {/* Cards */}
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 g-4 justify-content-center">
          {products.map((product) => (
            <div key={product.id} className="col">
              {/* Promo ribbon */}
              <div className="position-relative">
                <div
                  className="position-absolute top-0 start-0 bg-danger text-white fw-bold small px-3 py-1"
                  style={{
                    zIndex: 10,
                    borderRadius: "0 0 12px 0",
                    fontSize: "0.7rem",
                    letterSpacing: 1,
                  }}
                >
                  ★ DESTACADO
                </div>
                <ProductCard
                  product={product}
                  onViewDetails={onViewDetails}
                  onAddToCart={onAddToCart}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
