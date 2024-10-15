//

import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
// component
import App from "./App.jsx";
import "./index.css";

// ----------------------------------------------

createRoot(document.getElementById("root")).render(
  <React.Fragment>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.Fragment>
);
