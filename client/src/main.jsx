import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./router.jsx";
import { Toaster } from "react-hot-toast";
import { store } from "./redux/store.js";
import { Provider } from "react-redux";
import ApiProvider from "../contextApi/Api/ApiProvider.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <ApiProvider>
  <Provider store={store}>
    <React.StrictMode>
      <Toaster></Toaster>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </React.StrictMode>
  </Provider>
  </ApiProvider>
);
