import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { sendPromotion } from "../../store/promotion";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Addpromotion() {
  const [Promotion, setPromotion] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    const newValue =
        name === "pourcentage" || name === "opportuniteId" || name === "categorieClientId"
            ? isNaN(parseInt(value)) ? parseFloat(value) : parseInt(value)
            : value;

    setPromotion({ ...Promotion, [name]: newValue });
};

 

  const handleAddPromotion= () => {
   
    dispatch(sendPromotion(Promotion))
      .then((res) => {
        if (!res.error) {
          toast.success("Votre promotion a été ajoutée avec succès !");
          setTimeout(() => {
            navigate(-1);
          }, 2000);
        } else {
          toast.error(
            "Erreur lors de l'ajout de la promotion. Veuillez réessayer."
          );
        }
      })
      .catch((error) => {
        toast.error("Erreur lors de l'ajout de la promotion. Veuillez réessayer.");
      });
  };

  return (
    <div className="form-container">
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
          onChange={handleChange}
        />
      </div>
      <div className="form-input">
        <input
          className="form-control"
          placeholder="date_debut"
          name="date_debut"
          required
          onChange={handleChange}
        />
      </div>
      <div className="form-input">
        <input
          className="form-control"
          placeholder="date_fin"
          name="date_fin"
          required
          onChange={handleChange}
        />
      </div>
      <div className="form-input">
        <input
          className="form-control"
          placeholder="opportuniteId"
          name="opportuniteId"
         
          required
          onChange={handleChange}
        />
      </div>
      <div className="form-input">
        <input
          className="form-control"
          placeholder="categorieClientId"
          name="categorieClientId"
          required
          
          onChange={handleChange}
        />
      </div>
      
      

      <Button
      variant="warning"
      onClick={(e) => {
        e.preventDefault();
        handleAddPromotion();
      }}
      className="form-button"
      style={{ backgroundColor: 'blue' }} // Ajout de la couleur de fond bleue
    >
      Ajouter la promotion
    </Button>
      <ToastContainer />
    </div>
  );
}