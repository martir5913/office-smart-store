import { useState } from "react";
import { products } from "./data/products";
import { featuredProducts } from "./data/featuredProducts";
import { officeVideos } from "./data/officeVideos";
import Swal from "sweetalert2";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Catalog from "./components/Catalog";
import FeaturedProducts from "./components/FeaturedProducts";
import VideosSection from "./components/VideosSection";
import CatalogPDF from "./components/CatalogPDF";
import ProductModal from "./components/ProductModal";
import Cart from "./components/Cart";
import Footer from "./components/Footer";

export default function App() {
  // ── Navigation ────────────────────────────────────────────
  const [currentPage, setCurrentPage] = useState("home");

  // ── Category filter ───────────────────────────────────────
  const [activeCategory, setActiveCategory] = useState("Todos");

  // ── Product modal ─────────────────────────────────────────
  const [selectedProduct, setSelectedProduct] = useState(null);

  // ── Cart state ────────────────────────────────────────────
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  // ── Handlers ──────────────────────────────────────────────
  const showToast = (msg, type = "success") => {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
    });
    Toast.fire({
      icon: type,
      title: msg,
    });
  };

  const handleAddToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    showToast(`"${product.nombre}" agregado al carrito.`);
  };

  const handleRemoveFromCart = (id) => {
    const item = cartItems.find((i) => i.id === id);
    setCartItems((prev) => prev.filter((i) => i.id !== id));
    if (item) {
      showToast(`"${item.nombre}" eliminado del carrito.`, "info");
    }
  };

  const handleClearCart = () => {
    setCartItems([]);
    showToast("Carrito vaciado.", "warning");
  };

  const handleCheckout = () => {
    Swal.fire({
      title: "¿Confirmar compra?",
      text: "¿Desea finalizar y procesar su pedido simulado?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#0b132b",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, finalizar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "¡Compra exitosa!",
          text: "Su pedido ha sido procesado de forma simulada. ¡Muchas gracias!",
          icon: "success",
          confirmButtonColor: "#0b132b",
        });
        setCartItems([]);
        setCartOpen(false);
      }
    });
  };

  const cartCount = cartItems.reduce((sum, i) => sum + i.quantity, 0);

  // ── Render page content ───────────────────────────────────
  const renderContent = () => {
    switch (currentPage) {
      case "catalog":
        return (
          <Catalog
            products={products}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
            onViewDetails={setSelectedProduct}
            onAddToCart={handleAddToCart}
          />
        );
      case "featured":
        return (
          <FeaturedProducts
            products={featuredProducts}
            onViewDetails={setSelectedProduct}
            onAddToCart={handleAddToCart}
          />
        );
      case "videos":
        return <VideosSection videos={officeVideos} />;
      case "catalog-pdf":
        return <CatalogPDF />;
      default:
        return (
          <>
            <Hero onNavigate={setCurrentPage} />
            <FeaturedProducts
              products={featuredProducts}
              onViewDetails={setSelectedProduct}
              onAddToCart={handleAddToCart}
            />
            <Catalog
              products={products}
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
              onViewDetails={setSelectedProduct}
              onAddToCart={handleAddToCart}
            />
            <VideosSection videos={officeVideos} />
          </>
        );
    }
  };

  return (
    <>
      {/* ── SEO meta (basic) ── */}
      <Navbar
        cartCount={cartCount}
        onCategoryChange={(cat) => { setActiveCategory(cat); setCurrentPage("catalog"); }}
        activeCategory={activeCategory}
        onToggleCart={() => setCartOpen(!cartOpen)}
        onNavigate={setCurrentPage}
        currentPage={currentPage}
      />



      {/* Page content */}
      <main>
        {renderContent()}
      </main>

      <Footer />

      {/* Product Modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={handleAddToCart}
        />
      )}

      {/* Cart panel */}
      {cartOpen && (
        <Cart
          items={cartItems}
          onRemove={handleRemoveFromCart}
          onClear={handleClearCart}
          onCheckout={handleCheckout}
          onClose={() => setCartOpen(false)}
        />
      )}
    </>
  );
}
