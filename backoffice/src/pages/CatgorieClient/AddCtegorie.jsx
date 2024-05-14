import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { sendCategory } from "../../store/categorieClient";

export default function AddCategoryForm() {
  const dispatch = useDispatch();
  const [nom, setNom] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(sendCategory({ nom, description }))
      .then(() => {
        // Réinitialiser les champs après l'envoi réussi
        setNom("");
        setDescription("");
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  return (
    <div>
      <h2>Ajouter une catégorie</h2>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nom :</label>
          <input
            type="text"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
          />
        </div>
        <div>
          <label>Description :</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button type="submit">Ajouter</button>
      </form>
    </div>
  );
}
