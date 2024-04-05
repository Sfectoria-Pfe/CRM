import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { sendClient } from "../../../store/client"; // Assurez-vous d'importer la bonne action
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AddClient() {
  const [client, setClient] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setClient({ ...client, [name]: value });
};
 const handleAddClient = () => {
    dispatch(sendClient(client))
      .then((res) => {
        if (!res.error) {
          toast.success("Le client a été ajouté avec succès !");
          setTimeout(() => {
            navigate(-1);
          }, 2000);
        } else {
          toast.error("Erreur lors de l'ajout du client. Veuillez réessayer.");
        }
      })
      .catch((error) => {
        toast.error("Erreur lors de l'ajout du client. Veuillez réessayer.");
      });
  };

  return (
    <div className="form-container">
      <h2>Ajouter un client</h2>
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
          placeholder="Prénom"
          name="prenom"
          onChange={handleChange}
        />
      </div>
      <div className="form-input">
        <input
          className="form-control"
          placeholder="Email"
          name="email"
          type="email"
          onChange={handleChange}
        />
      </div>
      <div className="form-input">
        <input
          className="form-control"
          placeholder="Adresse"
          name="adresse"
          onChange={handleChange}
        />
      </div>
      <div className="form-input">
        <input
          className="form-control"
          placeholder="Téléphone"
          name="telephone"
          type="text"
          onChange={handleChange}
        />
      </div>
      <div className="form-input">
        <input
          className="form-control"
          placeholder="Mot de passe"
          name="password"
          type="password"
          onChange={handleChange}
        />
      </div>
      <Button variant="warning" onClick={handleAddClient} className="form-button">
        Ajouter le client
      </Button>
      <ToastContainer />
    </div>
  );
}
