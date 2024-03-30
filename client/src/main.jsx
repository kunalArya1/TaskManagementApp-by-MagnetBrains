import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthContextProvider } from "./partials/AuthContextProvider.jsx";
import { RouterProvider } from "react-router-dom";
import { router } from "./utils/router.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthContextProvider>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </AuthContextProvider>
);
