export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="text-white pt-5 pb-3" style={{ background: "#060b19" }}>
      <div className="container">
        <div className="row g-4 mb-4">
          {/* Brand */}
          <div className="col-lg-4">
            <h5 className="fw-bold mb-3">
              <i className="bi bi-briefcase-fill text-warning me-2"></i>
              Office<span className="text-warning">Smart</span> Store
            </h5>
            <p className="text-white-50 small">
              Tu aliado en artículos de oficina de alta calidad. Ergonomía, tecnología y organización
              para potenciar tu productividad.
            </p>
            <div className="d-flex gap-3 mt-3">
              {[
                { icon: "bi-github", href: "https://github.com" },
                { icon: "bi-facebook", href: "#" },
                { icon: "bi-instagram", href: "#" },
                { icon: "bi-twitter-x", href: "#" },
                { icon: "bi-linkedin", href: "#" },
                { icon: "bi-whatsapp", href: "#" },
              ].map(({ icon, href }) => (
                <a
                  key={icon}
                  href={href}
                  className="text-white-50 fs-5"
                  style={{ transition: "color 0.2s" }}
                  onMouseEnter={(e) => (e.target.style.color = "#ffc107")}
                  onMouseLeave={(e) => (e.target.style.color = "")}
                >
                  <i className={`bi ${icon}`}></i>
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div className="col-6 col-lg-2">
            <h6 className="fw-bold text-warning mb-3">Catálogo</h6>
            <ul className="list-unstyled small">
              {["Papelería", "Mobiliario", "Tecnología", "Organización", "Ergonomía"].map((cat) => (
                <li key={cat} className="mb-1">
                  <a href="#" className="text-white-50 text-decoration-none"
                    onMouseEnter={(e) => (e.target.style.color = "#ffc107")}
                    onMouseLeave={(e) => (e.target.style.color = "")}>
                    <i className="bi bi-chevron-right me-1" style={{ fontSize: "0.65rem" }}></i>
                    {cat}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="col-6 col-lg-2">
            <h6 className="fw-bold text-warning mb-3">Empresa</h6>
            <ul className="list-unstyled small">
              {["Sobre nosotros", "Blog", "Innovaciones", "Catálogo PDF", "Contacto"].map((item) => (
                <li key={item} className="mb-1">
                  <a href="#" className="text-white-50 text-decoration-none"
                    onMouseEnter={(e) => (e.target.style.color = "#ffc107")}
                    onMouseLeave={(e) => (e.target.style.color = "")}>
                    <i className="bi bi-chevron-right me-1" style={{ fontSize: "0.65rem" }}></i>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="col-lg-4">
            <h6 className="fw-bold text-warning mb-3">Contáctanos</h6>
            <ul className="list-unstyled small text-white-50">
              <li className="mb-2">
                <i className="bi bi-geo-alt-fill text-warning me-2"></i>
                6a Avenida 6-11, Zona 9, Ciudad de Guatemala
              </li>
              <li className="mb-2">
                <i className="bi bi-telephone-fill text-warning me-2"></i>
                +502 2222-3333
              </li>
              <li className="mb-2">
                <i className="bi bi-envelope-fill text-warning me-2"></i>
                info@officesmart.gt
              </li>
              <li className="mb-2">
                <i className="bi bi-clock-fill text-warning me-2"></i>
                Lun–Vie: 8:00 – 18:00
              </li>
            </ul>
          </div>
        </div>

        <hr className="border-secondary" />

        <div className="d-flex flex-wrap justify-content-between align-items-center small text-white-50">
          <span>© {year} Office Smart Store. Martir Dev</span>
          <span>
            Intecap 2026
          </span>
        </div>
      </div>
    </footer>
  );
}
