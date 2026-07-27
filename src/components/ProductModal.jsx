export default function ProductModal({ product, onClose, onAddToCart }) {
  if (!product) return null;

  const handleAdd = () => {
    onAddToCart(product);
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="modal-backdrop fade show"
        onClick={onClose}
        style={{ zIndex: 1040 }}
      />

      {/* Modal */}
      <div
        className="modal fade show d-block"
        tabIndex="-1"
        role="dialog"
        style={{ zIndex: 1050 }}
      >
        <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content border-0 shadow-lg">
            {/* Header */}
            <div
              className="modal-header text-white border-0"
              style={{ background: "linear-gradient(135deg, #1a237e, #3949ab)" }}
            >
              <h5 className="modal-title fw-bold">
                <i className="bi bi-info-circle-fill me-2"></i>
                Detalles del Producto
              </h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                onClick={onClose}
                aria-label="Cerrar"
              />
            </div>

            {/* Body */}
            <div className="modal-body p-0">
              <div className="row g-0">
                {/* Image */}
                <div className="col-md-5" style={{ backgroundColor: "#f8f9fa" }}>
                  <img
                    src={product.imagen}
                    alt={product.nombre}
                    referrerPolicy="no-referrer"
                    className="img-fluid w-100 h-100"
                    style={{ objectFit: "contain", minHeight: 280, padding: "15px" }}
                    onError={(e) => {
                      e.target.src = "https://placehold.co/400x280/e3e3e3/999?text=Sin+imagen";
                    }}
                  />
                </div>

                {/* Info */}
                <div className="col-md-7 p-4">
                  <h4 className="fw-bold text-dark mb-1">{product.nombre}</h4>
                  <p className="text-muted mb-3">
                    <i className="bi bi-tag-fill text-warning me-1"></i>
                    {product.marca}
                  </p>

                  {/* Specs grid */}
                  <div className="row g-2 mb-3">
                    {[
                      { label: "Categoría", value: product.categoria, icon: "bi-grid-fill" },
                      { label: "Color", value: product.color, icon: "bi-palette-fill" },
                      { label: "Material", value: product.material, icon: "bi-layers-fill" },
                      { label: "Garantía", value: product.garantia, icon: "bi-shield-check-fill" },
                    ].map(({ label, value, icon }) => (
                      <div key={label} className="col-6">
                        <div className="bg-light rounded p-2">
                          <small className="text-muted d-block">
                            <i className={`bi ${icon} me-1`}></i>{label}
                          </small>
                          <span className="fw-semibold small">{value}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Availability */}
                  <div className="mb-3">
                    {product.disponibilidad ? (
                      <span className="badge bg-success px-3 py-2">
                        <i className="bi bi-check-circle-fill me-1"></i>En stock
                      </span>
                    ) : (
                      <span className="badge bg-danger px-3 py-2">
                        <i className="bi bi-x-circle-fill me-1"></i>Sin stock
                      </span>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-muted small mb-3">{product.descripcionCompleta}</p>

                  {/* Price */}
                  <div className="d-flex align-items-center gap-3">
                    <span className="fs-3 fw-bold text-primary">
                      Q{product.precio.toFixed(2)}
                    </span>
                    <span className="text-muted text-decoration-line-through small">
                      Q{(product.precio * 1.15).toFixed(2)}
                    </span>
                    <span className="badge bg-danger">-15%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="modal-footer border-0 gap-2">
              <button className="btn btn-outline-secondary" onClick={onClose}>
                <i className="bi bi-x-circle me-1"></i>Cerrar
              </button>
              <button
                className="btn btn-primary px-4"
                disabled={!product.disponibilidad}
                onClick={handleAdd}
              >
                <i className="bi bi-cart-plus-fill me-1"></i>
                {product.disponibilidad ? "Agregar al carrito" : "Sin disponibilidad"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
