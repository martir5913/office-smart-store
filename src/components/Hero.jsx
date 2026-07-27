export default function Hero({ onNavigate }) {
  return (
    <section
      className="py-5 text-white"
      style={{
        background: "linear-gradient(135deg, #0b132b 0%, #1c2541 50%, #1d3557 100%)",
        minHeight: "480px",
      }}
    >
      <div className="container py-4">
        <div className="row align-items-center">
          {/* Text */}
          <div className="col-lg-6 mb-4 mb-lg-0">
            <span className="badge bg-warning text-dark fs-6 mb-3 px-3 py-2">
              <i className="bi bi-lightning-fill me-1"></i>¡Ofertas de temporada!
            </span>
            <h1 className="display-4 fw-bold lh-sm mb-3">
              Tu oficina,<br />
              <span className="text-warning">inteligente</span> y organizada
            </h1>
            <p className="lead opacity-75 mb-4">
              Descubre más de 25 productos seleccionados para transformar tu espacio de trabajo.
              Calidad, ergonomía y estilo en un solo lugar.
            </p>
            <div className="d-flex flex-wrap gap-3">
              <button
                className="btn btn-warning btn-lg fw-bold px-4 shadow"
                onClick={() => onNavigate("catalog")}
              >
                <i className="bi bi-grid-fill me-2"></i>Ver Catálogo
              </button>
              <button
                className="btn btn-outline-light btn-lg px-4"
                onClick={() => onNavigate("featured")}
              >
                <i className="bi bi-star-fill me-2"></i>Destacados
              </button>
            </div>

            {/* Mini stats */}
            <div className="row mt-5 g-3">
              {[
                { icon: "bi-box-seam", label: "25+ Productos" },
                { icon: "bi-truck", label: "Envío gratis" },
                { icon: "bi-shield-check", label: "Garantía oficial" },
                { icon: "bi-headset", label: "Soporte 24/7" },
              ].map((s) => (
                <div key={s.label} className="col-6 col-sm-3">
                  <div className="d-flex align-items-center gap-2">
                    <i className={`bi ${s.icon} fs-4 text-warning`}></i>
                    <span className="small fw-semibold">{s.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Image / promo card */}
          <div className="col-lg-6 text-center">
            <div
              className="card border-0 shadow-lg mx-auto text-dark"
              style={{ maxWidth: 380, borderRadius: 20, overflow: "hidden" }}
            >
              <div className="card-body p-0">
                <img
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80"
                  alt="Oficina moderna"
                  className="img-fluid w-100"
                  style={{ height: 240, objectFit: "cover" }}
                />
              </div>
              <div className="card-footer bg-white py-3 px-4 text-start">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <p className="mb-0 fw-bold">Promoción de la semana</p>
                    <p className="mb-0 text-muted small">Hasta 30% de descuento</p>
                  </div>
                  <span className="badge bg-danger fs-5 px-3 py-2">-30%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
