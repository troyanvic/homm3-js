import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// import i18n
import "@i18n/i18n";

// import components
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
