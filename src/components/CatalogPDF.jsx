import { useState, useEffect } from "react";
import { products } from "../data/products";
import { jsPDF } from "jspdf";

// Helper asíncrono para descargar la imagen y convertirla a base64 usando Canvas
// Como las imágenes ahora son locales en el servidor, no habrá bloqueos de CORS.
const getBase64ImageFromUrl = (imgUrl) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = imgUrl;
    
    img.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        // Calidad 0.85 para mantener las fotos locales con excelente nitidez en el PDF
        const dataURL = canvas.toDataURL("image/jpeg", 0.85);
        resolve(dataURL);
      } catch (err) {
        resolve(null);
      }
    };
    img.onerror = () => {
      resolve(null);
    };
  });
};

// Función de diseño vectorial de respaldo (fallback) en caso de que alguna imagen falle en cargar
const drawCategoryIcon = (doc, category, x, y) => {
  const w = 45;
  const h = 45;

  let bg = [240, 240, 240];
  let primary = [100, 100, 100];
  
  if (category === "Papelería") {
    bg = [255, 253, 240];
    primary = [41, 128, 185];
  } else if (category === "Mobiliario") {
    bg = [250, 243, 235];
    primary = [120, 80, 50];
  } else if (category === "Tecnología") {
    bg = [238, 247, 255];
    primary = [44, 62, 80];
  } else if (category === "Organización") {
    bg = [248, 240, 252];
    primary = [142, 68, 173];
  } else if (category === "Ergonomía") {
    bg = [240, 248, 242];
    primary = [39, 174, 96];
  }

  doc.setFillColor(bg[0], bg[1], bg[2]);
  doc.setDrawColor(220, 220, 220);
  doc.setLineWidth(0.3);
  doc.rect(x, y, w, h, "FD");

  if (category === "Papelería") {
    doc.setFillColor(41, 128, 185);
    doc.rect(x + 15, y + 8, 18, 24, "F");
    doc.setFillColor(255, 255, 255);
    doc.rect(x + 17, y + 9, 15, 22, "F");
    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(0.2);
    doc.line(x + 19, y + 13, x + 30, y + 13);
    doc.line(x + 19, y + 17, x + 30, y + 17);
    doc.line(x + 19, y + 21, x + 30, y + 21);
    doc.line(x + 19, y + 25, x + 30, y + 25);
    doc.setDrawColor(127, 140, 141);
    doc.setLineWidth(0.5);
    for (let sy = y + 10; sy <= y + 28; sy += 3.5) {
      doc.line(x + 13.5, sy, x + 15.5, sy);
    }
    doc.setFillColor(241, 196, 15);
    doc.rect(x + 7, y + 14, 4, 16, "F");
    doc.setFillColor(231, 76, 60);
    doc.rect(x + 7, y + 12, 4, 2, "F");
    doc.setFillColor(220, 220, 220);
    doc.triangle(x + 7, y + 30, x + 11, y + 30, x + 9, y + 33, "F");
    doc.setFillColor(0, 0, 0);
    doc.triangle(x + 8, y + 31.5, x + 10, y + 31.5, x + 9, y + 33, "F");
  } else if (category === "Mobiliario") {
    doc.setFillColor(141, 110, 99);
    doc.rect(x + 10, y + 22, 25, 3, "F");
    doc.setFillColor(80, 80, 80);
    doc.rect(x + 12, y + 25, 2, 11, "F");
    doc.rect(x + 31, y + 25, 2, 11, "F");
    doc.setFillColor(52, 73, 94);
    doc.rect(x + 17, y + 19, 8, 2, "F");
    doc.rect(x + 17, y + 12, 2, 7, "F");
    doc.setFillColor(100, 100, 100);
    doc.rect(x + 18, y + 21, 1, 5, "F");
    doc.rect(x + 22, y + 21, 1, 5, "F");
  } else if (category === "Tecnología") {
    doc.setFillColor(52, 73, 94);
    doc.rect(x + 8, y + 10, 29, 20, "F");
    doc.setFillColor(209, 237, 250);
    doc.rect(x + 10, y + 12, 25, 16, "F");
    doc.setFillColor(46, 204, 113);
    doc.rect(x + 13, y + 19, 4, 7, "F");
    doc.setFillColor(231, 76, 60);
    doc.rect(x + 19, y + 22, 4, 4, "F");
    doc.setFillColor(52, 152, 219);
    doc.rect(x + 25, y + 15, 4, 11, "F");
    doc.setFillColor(127, 140, 141);
    doc.rect(x + 20, y + 30, 5, 4, "F");
    doc.rect(x + 15, y + 34, 15, 2, "F");
  } else if (category === "Organización") {
    doc.setFillColor(149, 165, 166);
    doc.rect(x + 13, y + 8, 19, 28, "F");
    doc.setFillColor(189, 195, 199);
    doc.rect(x + 15, y + 10, 15, 6, "F");
    doc.rect(x + 15, y + 18, 15, 6, "F");
    doc.rect(x + 15, y + 26, 15, 6, "F");
    doc.setFillColor(44, 62, 80);
    doc.rect(x + 20, y + 12, 5, 1.5, "F");
    doc.rect(x + 20, y + 20, 5, 1.5, "F");
    doc.rect(x + 20, y + 28, 5, 1.5, "F");
  } else if (category === "Ergonomía") {
    doc.setFillColor(46, 204, 113);
    doc.ellipse(x + 23, y + 22, 9, 5, "F");
    doc.setDrawColor(44, 62, 80);
    doc.setLineWidth(1.5);
    doc.line(x + 14, y + 13, x + 16, y + 18);
    doc.line(x + 16, y + 18, x + 13, y + 25);
    doc.line(x + 13, y + 25, x + 17, y + 31);
    doc.setFillColor(44, 62, 80);
    doc.circle(x + 13, y + 10, 2, "F");
  }

  doc.setTextColor(primary[0], primary[1], primary[2]);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.5);
  doc.text(category.toUpperCase(), x + 22.5, y + 41, { align: "center" });
};

export default function CatalogPDF() {
  const [pdfUrl, setPdfUrl] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    generateCatalogPDF();
  }, []);

  const generateCatalogPDF = async () => {
    try {
      const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      // ─── PORTADA (PÁGINA 1) ───
      // Fondo oscuro
      doc.setFillColor(11, 19, 43); // Navy muy oscuro
      doc.rect(0, 0, 210, 297, "F");

      // Título principal
      doc.setTextColor(255, 193, 7); // Amarillo advertencia / dorado
      doc.setFont("helvetica", "bold");
      doc.setFontSize(26);
      doc.text("OFFICE SMART STORE", 105, 110, { align: "center" });

      // Subtítulo
      doc.setTextColor(255, 255, 255);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(15);
      doc.text("Catálogo Oficial de Artículos de Oficina", 105, 122, { align: "center" });

      // Línea divisoria
      doc.setDrawColor(255, 193, 7);
      doc.setLineWidth(1);
      doc.line(75, 130, 135, 130);

      // Pie de portada
      doc.setTextColor(180, 180, 180);
      doc.setFontSize(11);
      doc.text("Catálogo Inteligente Integrado en React & Bootstrap", 105, 140, { align: "center" });
      
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(10);
      doc.text("Proyecto Académico · Ciclo 2026", 105, 250, { align: "center" });

      // ─── PÁGINAS DE PRODUCTOS (3 POR PÁGINA) ───
      let pageNumber = 2;
      let itemIndex = 0;

      while (itemIndex < products.length) {
        doc.addPage();

        // Encabezado superior
        doc.setFillColor(28, 37, 65); // Fondo del encabezado
        doc.rect(0, 0, 210, 20, "F");

        doc.setTextColor(255, 255, 255);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(10);
        doc.text("OFFICE SMART STORE  |  CATÁLOGO DIGITAL DE PRODUCTOS", 15, 13);

        doc.setFont("helvetica", "normal");
        doc.text(`Página ${pageNumber}`, 195, 13, { align: "right" });

        // Listar 3 productos en esta página
        let yOffset = 30;
        const itemsPerPage = 3;

        for (let i = 0; i < itemsPerPage && itemIndex < products.length; i++) {
          const p = products[itemIndex];

          // Caja contenedora del producto
          doc.setDrawColor(220, 220, 220);
          doc.setFillColor(250, 250, 250);
          doc.rect(15, yOffset, 180, 72, "FD");

          // Descarga asíncrona de imagen local en Base64
          const imgData = await getBase64ImageFromUrl(p.imagen);

          if (imgData) {
            try {
              // Incrustar imagen real en el PDF
              doc.addImage(imgData, "JPEG", 20, yOffset + 6, 45, 45);
            } catch (err) {
              // Fallback si la codificación falla
              drawCategoryIcon(doc, p.categoria, 20, yOffset + 6);
            }
          } else {
            // Fallback en dibujo vectorial si por algún motivo falla en cargar la foto local
            drawCategoryIcon(doc, p.categoria, 20, yOffset + 6);
          }

          // Título del Producto
          const textX = 72;
          doc.setTextColor(11, 19, 43); // Azul Marino Oscuro
          doc.setFont("helvetica", "bold");
          doc.setFontSize(12);
          doc.text(p.nombre, textX, yOffset + 12);

          // Detalles secundarios (Marca, Categoría)
          doc.setTextColor(100, 100, 100);
          doc.setFont("helvetica", "normal");
          doc.setFontSize(9);
          doc.text(`Marca: ${p.marca}    |    Categoría: ${p.categoria}`, textX, yOffset + 18);

          // Especificaciones (Material, Color, Garantía)
          doc.setFontSize(8);
          doc.setTextColor(120, 120, 120);
          doc.text(`Material: ${p.material}  ·  Color: ${p.color}  ·  Garantía: ${p.garantia}`, textX, yOffset + 23);

          // Descripción larga wrap
          doc.setTextColor(50, 50, 50);
          doc.setFontSize(8.5);
          const splitDesc = doc.splitTextToSize(p.descripcionCompleta, 118);
          doc.text(splitDesc, textX, yOffset + 29);

          // Disponibilidad
          if (p.disponibilidad) {
            doc.setFillColor(40, 167, 69); // Verde
            doc.rect(textX, yOffset + 53, 20, 5, "F");
            doc.setTextColor(255, 255, 255);
            doc.setFontSize(7);
            doc.setFont("helvetica", "bold");
            doc.text("Disponible", textX + 10, yOffset + 56.5, { align: "center" });
          } else {
            doc.setFillColor(220, 53, 69); // Rojo
            doc.rect(textX, yOffset + 53, 20, 5, "F");
            doc.setTextColor(255, 255, 255);
            doc.setFontSize(7);
            doc.setFont("helvetica", "bold");
            doc.text("Sin Stock", textX + 10, yOffset + 56.5, { align: "center" });
          }

          // Precio
          doc.setTextColor(11, 19, 43);
          doc.setFont("helvetica", "bold");
          doc.setFontSize(13);
          doc.text(`Precio: Q${p.precio.toFixed(2)}`, textX + 25, yOffset + 57.5);

          yOffset += 78;
          itemIndex++;
        }

        pageNumber++;
      }

      // Crear URL para el blob del PDF generado
      const pdfBlob = doc.output("blob");
      const url = URL.createObjectURL(pdfBlob);
      setPdfUrl(url);
      setLoading(false);
    } catch (error) {
      console.error("Error generating PDF:", error);
      setLoading(false);
    }
  };

  return (
    <section className="py-5 bg-light">
      <div className="container">
        {/* Cabecera de la sección */}
        <div className="text-center mb-5">
          <span className="badge bg-danger px-3 py-2 mb-2 fs-6">
            <i className="bi bi-file-earmark-pdf-fill me-1"></i>PDF
          </span>
          <h2 className="fw-bold display-6">Catálogo Digital</h2>
          <p className="text-muted lead">
            Consulta nuestro catálogo de productos en formato PDF interactivo.
          </p>
          <div className="mx-auto" style={{ width: 60, height: 4, background: "#dc3545", borderRadius: 2 }} />
        </div>

        {/* Botones de acción */}
        {!loading && (
          <div className="d-flex flex-wrap justify-content-center gap-3 mb-4">
            <a
              href={pdfUrl}
              target="_blank"
              rel="noreferrer"
              className="btn btn-primary px-4"
              style={{ backgroundColor: "#0b132b", borderColor: "#0b132b" }}
            >
              <i className="bi bi-box-arrow-up-right me-2"></i>Abrir en nueva pestaña
            </a>
            <a
              href={pdfUrl}
              download="catalogo-office-smart-store.pdf"
              className="btn btn-outline-danger px-4"
            >
              <i className="bi bi-download me-2"></i>Descargar PDF
            </a>
          </div>
        )}

        {/* Info card */}
        <div className="alert alert-info d-flex align-items-center mb-4 border-0 shadow-sm" role="alert">
          <i className="bi bi-info-circle-fill fs-5 me-3 text-info flex-shrink-0"></i>
          <div>
            <strong>Catálogo Autogenerado:</strong> El catálogo lee e incrusta las fotos locales
            de los productos asíncronamente. En caso de fallar, recurre al sistema de diseño vectorial de respaldo.
          </div>
        </div>

        {/* Contenedor del visor PDF */}
        <div
          className="bg-white rounded-4 shadow overflow-hidden"
          style={{ height: "75vh", minHeight: 500 }}
        >
          {loading ? (
            <div className="d-flex flex-column align-items-center justify-content-center h-100 py-5">
              <div className="spinner-border text-danger mb-3" role="status">
                <span className="visually-hidden">Generando...</span>
              </div>
              <p className="text-muted">Procesando imágenes locales y estructurando PDF...</p>
            </div>
          ) : (
            <embed
              src={pdfUrl}
              type="application/pdf"
              width="100%"
              height="100%"
              title="Catálogo Office Smart Store"
            />
          )}
        </div>
      </div>
    </section>
  );
}
