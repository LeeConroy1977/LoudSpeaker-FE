import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ScreenSizeProvider } from "./contexts/ScreenSizeContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ScreenSizeProvider>
    <App />
  </ScreenSizeProvider>
);
