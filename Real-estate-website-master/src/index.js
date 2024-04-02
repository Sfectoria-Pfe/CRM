import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "./components/services/LoginForm.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import './components/common/header/header.css';
import './components/home/recent/recent.css';
import './components/Demandedevis/Demandedevis.css'
import './components/Demande rendez-vous/rendez-vous.css'
const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
