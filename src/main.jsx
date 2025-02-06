// import { StrictMode } from 'react'
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "./index.css";
import "flowbite";
createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <App />
  // </StrictMode>,
);
