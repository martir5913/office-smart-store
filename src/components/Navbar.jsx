import { useState, useEffect } from "react";

const categories = [
  "Todos",
  "Papelería",
  "Mobiliario",
  "Tecnología",
  "Organización",
  "Ergonomía",
];

export default function Navbar({
  cartCount,
  onCategoryChange,
  activeCategory,
  onToggleCart,
  onNavigate,
  currentPage,
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleCategory = (cat) => {
    onCategoryChange(cat);
    onNavigate("catalog");
    setMenuOpen(false);
    setDropdownOpen(false);
  };

  const handleDropdownToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDropdownOpen(!dropdownOpen);
  };

  useEffect(() => {
    if (!dropdownOpen) return;
    const handleClose = () => setDropdownOpen(false);
    document.addEventListener("click", handleClose);
    return () => document.removeEventListener("click", handleClose);
  }, [dropdownOpen]);

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark sticky-top shadow"
      style={{
        background: "linear-gradient(135deg, #0b132b 0%, #1c2541 100%)",
      }}
    >
      <div className="container">
        {/* Brand */}
        <a
          className="navbar-brand d-flex align-items-center gap-2 fw-bold fs-4"
          href="#"
          onClick={() => onNavigate("home")}
        >
          <i className="bi bi-briefcase-fill text-warning"></i>
          <span>
            Office<span className="text-warning">Smart</span> Store
          </span>
        </a>

        {/* Toggler */}
        <button
          className="navbar-toggler border-0"
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Nav links */}
        <div className={`collapse navbar-collapse ${menuOpen ? "show" : ""}`}>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a
                className={`nav-link ${currentPage === "home" ? "active fw-semibold" : ""}`}
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate("home");
                  setMenuOpen(false);
                }}
              >
                <i className="bi bi-house-fill me-1"></i>Inicio
              </a>
            </li>

            {/* Dropdown categorías */}
            <li className="nav-item dropdown">
              <a
                className={`nav-link dropdown-toggle ${currentPage === "catalog" ? "active fw-semibold" : ""} ${dropdownOpen ? "show" : ""}`}
                href="#"
                role="button"
                onClick={handleDropdownToggle}
                aria-expanded={dropdownOpen}
              >
                <i className="bi bi-grid-fill me-1"></i>Catálogo
              </a>
              <ul
                className={`dropdown-menu dropdown-menu-dark ${dropdownOpen ? "show" : ""}`}
              >
                {categories.map((cat) => (
                  <li key={cat}>
                    <a
                      className={`dropdown-item ${activeCategory === cat ? "active" : ""}`}
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        handleCategory(cat);
                      }}
                    >
                      {cat}
                    </a>
                  </li>
                ))}
              </ul>
            </li>

            <li className="nav-item">
              <a
                className={`nav-link ${currentPage === "featured" ? "active fw-semibold" : ""}`}
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate("featured");
                  setMenuOpen(false);
                }}
              >
                <i className="bi bi-star-fill me-1"></i>Destacados
              </a>
            </li>

            <li className="nav-item">
              <a
                className={`nav-link ${currentPage === "videos" ? "active fw-semibold" : ""}`}
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate("videos");
                  setMenuOpen(false);
                }}
              >
                <i className="bi bi-play-circle-fill me-1"></i>Innovaciones
              </a>
            </li>

            <li className="nav-item">
              <a
                className={`nav-link ${currentPage === "catalog-pdf" ? "active fw-semibold" : ""}`}
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate("catalog-pdf");
                  setMenuOpen(false);
                }}
              >
                <i className="bi bi-file-earmark-pdf-fill me-1"></i>Catálogo PDF
              </a>
            </li>
          </ul>

          {/* GitHub button */}
          <a
            href="https://github.com/martir5913/office-smart-store"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline-light me-2 d-inline-flex align-items-center gap-2"
            title="Ver código fuente en GitHub"
          >
            <i className="bi bi-github"></i>
            <span className="d-none d-sm-inline small">GitHub</span>
          </a>

          {/* Cart button */}
          <button
            className="btn btn-warning fw-semibold position-relative"
            onClick={onToggleCart}
          >
            <i className="bi bi-cart3 me-1"></i>Carrito
            {cartCount > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}
