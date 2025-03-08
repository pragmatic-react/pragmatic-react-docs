import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.js";
import { RestaurantProvider } from "./RestaurantProvider.js";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RestaurantProvider>
      <App />
    </RestaurantProvider>
  </React.StrictMode>
);
