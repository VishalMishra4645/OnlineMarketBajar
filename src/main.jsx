import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom"
import "./index.css";
import App from "./App.jsx";
import StoreContect from "./Context/StoreContect.jsx";
// import Navbar from "./Pages/Navbar.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <StoreContect>
      <App />
    </StoreContect>
  </BrowserRouter>
);
