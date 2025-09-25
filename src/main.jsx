import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { AuthProvider } from "./context/AuthContext";
import { FavoritesProvider } from "./context/FavoritesContext";
import Loader from "./components/Loader";
import { ToastProvider } from "./context/ToastContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <FavoritesProvider>
        <ToastProvider>
          <Loader />
          <App />
        </ToastProvider>
      </FavoritesProvider>
    </AuthProvider>
  </React.StrictMode>
);
