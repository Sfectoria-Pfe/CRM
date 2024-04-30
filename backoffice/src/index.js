import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css"; // Import du fichier CSS de Font Awesome
import "./App.css";
import "./pages/calendrier/calend.css";

import reportWebVitals from "./reportWebVitals";
import Router from "./router/Router";
import { Provider } from "react-redux";
import { store } from "./store/store";
import App from "./apps/App";
import "./pages/To doList/Todo.css";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <Router />
  </Provider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
