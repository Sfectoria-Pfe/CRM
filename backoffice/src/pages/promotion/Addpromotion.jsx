import React, { useState } from "react";
import { Button, FormSelect } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { sendPromotion } from "../../store/promotion";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { fetchOpportunites } from "../../store/opportunite";
import { fetchCategories } from "../../store/categorieClient";

export default function Addpromotion() {
  const [Promotion, setPromotion] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const opportunites = useSelector(
    (state) => state.opportunite.opportunites.items
  );
  const category = useSelector(
    (state) => state.categorieClient.categories.items
  );

  useEffect(() => {
    dispatch(fetchOpportunites());
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue;

    if (name === "pourcentage") {
      // Vérifier si la valeur est un nombre
      const floatValue = parseFloat(value);
      // Vérifier si la valeur est entre 0 et 99
      newValue = isNaN(floatValue) ? "" : Math.min(99, Math.max(0, floatValue));
    } else {
      // Convertir les autres champs en nombres entiers
      newValue = isNaN(parseInt(value)) ? value : parseInt(value);
    }

    setPromotion({ ...Promotion, [name]: newValue });
  };

  const handleAddPromotion = () => {
    dispatch(sendPromotion(Promotion))
      .then((res) => {
        if (!res.error) {
          toast.success("Votre promotion a été ajoutée avec succès !");
          setTimeout(() => {
            navigate(1);
          }, 2000);
        } else {
          toast.error(
            "Erreur lors de l'ajout de la promotion. Veuillez réessayer."
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
    <div
      className="form-container"
      style={{
        backgroundColor: "#42a5f5",
        padding: "20px",
        borderRadius: "10px",
      }}
    >
      <h2>Ajouter une promotion</h2>
      <div className="form-input">
        <textarea
          className="form-control"
          placeholder="Description"
          name="description"
          required
          onChange={handleChange}
        />
      </div>
      <div className="form-input">
        <input
          className="form-control"
          placeholder="pourcentage"
          name="pourcentage"
          type="number"
          required
          min={0}
          max={99}
          onChange={handleChange}
        />
      </div>
      <div className="form-input">
        <input
          className="form-control"
          placeholder="date_debut"
          name="date_debut"
          type="date"
          required
          onChange={handleChange}
        />
      </div>
      <div className="form-input">
        <FormSelect name="categorieClientId" required onChange={handleChange}>
          <option value={null}>Choisie categorie du client</option>
          {category.map((elem, i) => (
            <option value={elem.id}>{elem.nom}</option> // Utilisez 'categories' au lieu de 'CategorieClient'
          ))}
        </FormSelect>
      </div>{" "}
      <div className="form-input">
        <FormSelect name="opportuniteId" required onChange={handleChange}>
          <option value={null}>Choisie nom du votre opportunite</option>
          {opportunites.map((elem, i) => (
            <option value={elem.id}>{elem.title}</option>
          ))}
        </FormSelect>
      </div>
      {/* <div className="form-input">
        <input
          className="form-control"
          placeholder="opportuniteId"
          name="opportuniteId"
          required
          onChange={handleChange}
        />
      </div> */}
      {/* <div className="form-input">
        <input
          className="form-control"
          placeholder="categorieClientId"
          name="categorieClientId"
          required
          onChange={handleChange}
        />
      </div> */}
      <Button
        variant="warning"
        onClick={(e) => {
          e.preventDefault();
          handleAddPromotion();
        }}
        className="form-button"
        style={{ backgroundColor: "#81c784" }} // Ajout de la couleur de fond bleue
      >
        Ajouter la promotion
      </Button>
      <ToastContainer />
    </div>
  );
}
