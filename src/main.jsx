import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import dashboardReducer from "./store/dashboardSlice";
import App from "./App";
import "./index.css";

const store = configureStore({
  reducer: { dashboard: dashboardReducer },
});

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);