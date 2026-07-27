import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// Bootstrap CSS + Icons
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
// Bootstrap JS (for dropdown, etc.)
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
