import React, { useState } from "react";
import { Link } from "react-router-dom"; // Importez Link pour créer des liens

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    // Logique de connexion à ajouter ici
    console.log("Connexion avec :", email, password);
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
        <button type="submit">Se connecter</button>
      </form>
      <p>Vous n'avez pas de compte ? <Link to="/SignupForm">Inscrivez-vous ici</Link>.</p>
    </div>
  );
};

export default LoginForm;
