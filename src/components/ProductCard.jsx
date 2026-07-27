const categoryColors = {
  Papelería: "primary",
  Mobiliario: "success",
  Tecnología: "danger",
  Organización: "warning",
  Ergonomía: "info",
};

export default function ProductCard({ product, onViewDetails, onAddToCart }) {
  const badgeColor = categoryColors[product.categoria] || "secondary";

  return (
    <div className="card h-100 shadow-sm border-0 product-card">
      {/* Image */}
      <div className="position-relative overflow-hidden" style={{ height: 200, backgroundColor: "#f8f9fa" }}>
        <img
          src={product.imagen}
          alt={product.nombre}
          referrerPolicy="no-referrer"
          className="card-img-top w-100 h-100"
          style={{ objectFit: "contain", padding: "8px", transition: "transform 0.3s" }}
          onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
          onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
          onError={(e) => {
            e.target.src = "https://placehold.co/400x200/e3e3e3/999?text=Sin+imagen";
          }}
        />
        <span className={`position-absolute top-0 start-0 m-2 badge bg-${badgeColor}`}>
          {product.categoria}
        </span>
        {!product.disponibilidad && (
          <span className="position-absolute top-0 end-0 m-2 badge bg-secondary">
            Sin stock
          </span>
        )}
      </div>

      {/* Body */}
      <div className="card-body d-flex flex-column">
        <h6 className="card-title fw-bold text-truncate" title={product.nombre}>
          {product.nombre}
        </h6>
        <p className="card-text text-muted small flex-grow-1" style={{
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}>
          {product.descripcionCorta}
        </p>

        <div className="d-flex align-items-center justify-content-between mt-2 mb-3">
          <span className="fs-5 fw-bold text-primary">
            Q{product.precio.toFixed(2)}
          </span>
          <span className="text-muted small">
            <i className="bi bi-tag-fill me-1 text-warning"></i>
            {product.marca}
          </span>
        </div>

        {/* Buttons */}
        <div className="d-grid gap-2">
          <button
            className="btn btn-outline-primary btn-sm"
            onClick={() => onViewDetails(product)}
          >
            <i className="bi bi-eye-fill me-1"></i>Ver detalles
          </button>
          <button
            className="btn btn-primary btn-sm"
            disabled={!product.disponibilidad}
            onClick={() => onAddToCart(product)}
          >
            <i className="bi bi-cart-plus-fill me-1"></i>
            {product.disponibilidad ? "Agregar al carrito" : "Sin disponibilidad"}
          </button>
        </div>
      </div>
    </div>
  );
}
