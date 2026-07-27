import Swal from "sweetalert2";

export default function Cart({ items, onRemove, onClear, onCheckout, onClose }) {
  const total = items.reduce((sum, item) => sum + item.precio * item.quantity, 0);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      {/* Backdrop */}
      <div
        className="position-fixed top-0 start-0 w-100 h-100"
        style={{ background: "rgba(0,0,0,0.4)", zIndex: 1030 }}
        onClick={onClose}
      />

      {/* Cart panel */}
      <div
        className="position-fixed top-0 end-0 h-100 bg-white shadow-lg d-flex flex-column"
        style={{ width: "min(420px, 95vw)", zIndex: 1031, overflowY: "auto" }}
      >
        {/* Header */}
        <div
          className="text-white p-4 d-flex justify-content-between align-items-center"
          style={{ background: "linear-gradient(135deg, #0b132b, #1c2541)" }}
        >
          <div>
            <h5 className="mb-0 fw-bold">
              <i className="bi bi-cart3 me-2"></i>Mi Carrito
            </h5>
            <small className="opacity-75">{totalItems} artículo{totalItems !== 1 ? "s" : ""}</small>
          </div>
          <button className="btn btn-outline-light btn-sm" onClick={onClose}>
            <i className="bi bi-x-lg"></i>
          </button>
        </div>

        {/* Empty state */}
        {items.length === 0 ? (
          <div className="flex-grow-1 d-flex flex-column align-items-center justify-content-center text-muted p-4 text-center">
            <i className="bi bi-cart-x display-1 mb-3 opacity-25"></i>
            <h6 className="fw-bold">Tu carrito está vacío</h6>
            <p className="small">Agrega productos desde el catálogo para comenzar.</p>
          </div>
        ) : (
          <>
            {/* Items */}
            <div className="flex-grow-1 overflow-auto p-3">
              {items.map((item) => (
                <div key={item.id} className="card border-0 bg-light mb-3">
                  <div className="card-body p-3 d-flex gap-3 align-items-start">
                    <img
                      src={item.imagen}
                      alt={item.nombre}
                      referrerPolicy="no-referrer"
                      className="rounded border"
                      style={{ width: 64, height: 64, objectFit: "contain", backgroundColor: "#fff", padding: "2px", flexShrink: 0 }}
                      onError={(e) => {
                        e.target.src = "https://placehold.co/64x64/e3e3e3/999?text=...";
                      }}
                    />
                    <div className="flex-grow-1 min-w-0">
                      <p className="mb-1 fw-semibold small text-truncate">{item.nombre}</p>
                      <p className="mb-1 text-muted" style={{ fontSize: "0.75rem" }}>
                        {item.marca} · {item.categoria}
                      </p>
                      <div className="d-flex align-items-center justify-content-between">
                        <div>
                          <span className="badge bg-primary me-1">x{item.quantity}</span>
                          <span className="small text-muted">Q{item.precio.toFixed(2)} c/u</span>
                        </div>
                        <span className="fw-bold text-primary small">
                          Q{(item.precio * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => onRemove(item.id)}
                      title="Eliminar"
                    >
                      <i className="bi bi-trash3-fill"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="border-top p-4">
              {/* Summary */}
              <div className="d-flex justify-content-between mb-1 small text-muted">
                <span>Subtotal ({totalItems} artículos)</span>
                <span>Q{total.toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between mb-1 small text-muted">
                <span>Envío</span>
                <span className="text-success fw-semibold">Gratis</span>
              </div>
              <hr className="my-2" />
              <div className="d-flex justify-content-between mb-4 fw-bold fs-5">
                <span>Total</span>
                <span className="text-primary">Q{total.toFixed(2)}</span>
              </div>

              <div className="d-grid gap-2">
                <button
                  className="btn btn-primary btn-lg fw-bold"
                  style={{ backgroundColor: "#0b132b", borderColor: "#0b132b" }}
                  onClick={onCheckout}
                >
                  <i className="bi bi-credit-card-fill me-2"></i>Finalizar compra
                </button>
                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => {
                    Swal.fire({
                      title: "¿Vaciar carrito?",
                      text: "Se eliminarán todos los artículos de su carrito.",
                      icon: "warning",
                      showCancelButton: true,
                      confirmButtonColor: "#0b132b",
                      cancelButtonColor: "#d33",
                      confirmButtonText: "Sí, vaciar",
                      cancelButtonText: "Cancelar"
                    }).then((result) => {
                      if (result.isConfirmed) {
                        onClear();
                      }
                    });
                  }}
                >
                  <i className="bi bi-trash3 me-1"></i>Vaciar carrito
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
