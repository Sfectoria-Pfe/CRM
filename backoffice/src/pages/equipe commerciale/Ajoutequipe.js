import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { createEquipeCommerciale } from "../../store/Equipe";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

export default function AddEquipe() {
  const [equipe, setEquipe] = useState("");
  const [chefIdCount, setChefIdCount] = useState(1); // Compteur pour générer des ID uniques pour les chefs
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newValue =
      name === "chefId" || name === "nombre" 
        ? isNaN(parseInt(value))
          ? ""
          : parseInt(value)
        : value;

    setEquipe({ ...equipe, [name]: newValue });
  };

  const handleAddChefIdInput = () => {
    setChefIdCount(chefIdCount + 1); // Incrémente le compteur
  };

  const handleAddEquipe = () => {
    dispatch(createEquipeCommerciale(equipe))
      .then((res) => {
        if (!res.error) {
          toast.success("Votre Equipe a été ajoutée avec succès !");
          setTimeout(() => {
            navigate(-1);
          }, 2000);
        } else {
          toast.error(
            "Erreur lors de l'ajout de la equipe. Veuillez réessayer."
          );
        }
      })
      .catch((error) => {
        toast.error(
          "Erreur lors de l'ajout de la promotion. Veuillez réessayer."
        );
      });
  };

  return (
    <div className="form-container">
      <h2>Ajouter une equipe</h2>

      <div className="form-input">
        <textarea
          className="form-control"
          placeholder="nom_equipe"
          name="nom_equipe"
          required
          onChange={handleChange}
        />
      </div>
      <div className="form-input">
        <input
          className="form-control"
          placeholder="nombre"
          name="nombre"
          type="number"
          required
          onChange={handleChange}
        />
      </div>
      <div className="form-input">
        <input
          className="form-control"
          placeholder="chefId"
          name="chefId"
          type="number"
          required
          onChange={handleChange}
        />
        {[...Array(chefIdCount)].map((_, index) => (
          <input
            key={index}
            className="form-control"
            placeholder={`chefId ${index + 2}`}
            name={`chefId${index + 2}`}
            type="number"
            onChange={handleChange}
          />
        ))}
        <FontAwesomeIcon
          icon={faPlus}
          onClick={handleAddChefIdInput}
          style={{ cursor: "pointer", marginLeft: "5px" }}
        />
      </div>
      
      <Button
        variant="warning"
        onClick={(e) => {
          e.preventDefault();
          handleAddEquipe();
        }}
        className="form-button"
        style={{ backgroundColor: "blue" }}
      >
        Ajouter la equipe
      </Button>
      <ToastContainer />
    </div>
  );
}
