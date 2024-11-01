import "./index.css"

import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";

// Create root element
const container = document.getElementById("root");

// Ensure container exists
if (!container) {
  throw new Error("Failed to find the root element");
}

// Create root
const root = createRoot(container);

// Render app
root.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);