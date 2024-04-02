import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { sendService } from "../../../store/services";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import './styles.css'; // Ajoutez le chemin vers votre fichier CSS de style

export default function AddService() {
  const [service, setService] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Convertir le prix et adminId en nombre à virgule flottante et en entier respectivement
    const newValue = name === "prix" ? parseFloat(value) : name === "adminId" ? parseInt(value) : value;
    setService({ ...service, [name]: newValue });
  };

  const handleAddService = () => {
    dispatch(sendService(service))
      .then((res) => {
        if (!res.error) {
          toast.success("Votre service a été ajouté avec succès !");
          setTimeout(() => {
            navigate(-1);
          }, 2000); // Redirige après 2 secondes
        } else {
          toast.error("Erreur lors de l'ajout du service. veuillez réesayer.");
        }
      })
      .catch((error) => {
        toast.error("Erreur lors de l'ajout du service. Veuillez réessayer.");
      });
  };

  return (
    <div className="form-container">
      <h2>Ajouter un service</h2>
      <div className="form-input">
        <input
          className="form-control"
          placeholder="Nom"
          name="nom"
          onChange={handleChange}
        />
      </div>
      <div className="form-input">
        <input
          className="form-control"
          placeholder="Prix"
          name="prix"
          type="number"
          min={0}
          onChange={handleChange}
        />
      </div>
      <div className="form-input">
        <input
          className="form-control"
          placeholder="Lieu"
          name="lieu"
          onChange={handleChange}
        />
      </div>
      <div className="form-input">
        <input
          className="form-control"
          placeholder="Description"
          name="description"
          onChange={handleChange}
        />
      </div>
      <div className="form-input">
        <input
          className="form-control"
          placeholder="adminId"
          name="adminId"
          type="number"
          onChange={handleChange}
        />
      </div>
      <Button variant="warning" onClick={handleAddService} className="form-button">
        Ajouter le service
      </Button>
      <ToastContainer />
    </div>
  );
}
