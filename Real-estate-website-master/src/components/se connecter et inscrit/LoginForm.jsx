import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Importez Link pour créer des liens
import { loginClient } from "../store/auth";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();
    // Logique de connexion à ajouter ici
    dispatch(loginClient({ password, email }))
      .then((res) => {
        if (!res.error) {
          toast.success("Votre compte a été ajouté avec succès !");
          setTimeout(() => {
            navigate("/profile");
          }, 2000);
        } else {
          toast.error("Erreur lors de l'ajout du compte. Veuillez réessayer.");
        }
      })
      .catch((error) => {
        toast.error("Erreur lors de l'ajout du compte. Veuillez réessayer.");
      });
  };

  return (
    <div className="login-form">
      <h2>Connexion</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Adresse e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" onSubmit={handleLogin}>
          Se connecter
        </button>
      </form>
      <p>
        Vous n'avez pas de compte ?{" "}
        <Link to="/SignupForm">Inscrivez-vous ici</Link>.
      </p>
      <ToastContainer />
    </div>
  );
};

export default LoginForm;
