import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { sendOpportunite } from "../../store/opportunite";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddOpportunite = () => {
  const [opportunite, setOpportunite] = useState({}); 
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newValue = name === "equipeCommercialeId" ? parseInt(value) : value;

    setOpportunite({ ...opportunite, [name]:newValue });
  };

  const handleAddOpportunite = () => {
    dispatch(sendOpportunite(opportunite))
      .then((res) => {
        if (!res.error) {
          toast.success("L'opportunité a été ajoutée avec succès !");
          setTimeout(() => {
            navigate(-1);
          }, 2000);
        } else {
          toast.error("Erreur lors de l'ajout de l'opportunité. Veuillez réessayer.");
        }
      })
      .catch((error) => {
        toast.error("Erreur lors de l'ajout de l'opportunité. Veuillez réessayer.");
      });
  };

  return (
    <div className="form-container">
      <h2>Ajouter une opportunité</h2>
      <div className="form-input">
        <input
          className="form-control"
          placeholder="Titre"
          name="title"
          onChange={handleChange}
        />
      </div>
      <div className="form-input">
        <input
          className="form-control"
          placeholder="ID équipe commerciale"
          name="equipeCommercialeId"
          type="number"
          onChange={handleChange}
        />
      </div>
      <Button variant="warning" onClick={handleAddOpportunite} className="form-button">
        Ajouter l'opportunité
      </Button>
      <ToastContainer />
    </div>
  );
};

export default AddOpportunite;
