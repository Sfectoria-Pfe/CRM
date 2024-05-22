import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { sendClient } from "../../../store/client";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AddClient() {
  const [client, setClient] = useState({});
  const [showModal, setShowModal] = useState(true); // Ouvrir la modal automatiquement
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClient({ ...client, [name]: value });
  };

  const handleAddClient = () => {
    // Validation du CIN et du numéro de téléphone
    const cinRegex = /^\d{8}$/;
    const phoneRegex = /^\d{8}$/;

    if (!cinRegex.test(client.cin)) {
      toast.error("Veuillez saisir un numéro de CIN valide (8 chiffres) !");
      return;
    }

    if (!phoneRegex.test(client.telephone)) {
      toast.error("Veuillez saisir un numéro de téléphone valide (8 chiffres) !");
      return;
    }

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

  const handleCloseModal = () => setShowModal(false);

  useEffect(() => {
    // Ouvrir automatiquement la modal lorsque le composant est monté
    setShowModal(true);
  }, []);

  return (
    <div>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton style={{padding:"40px"}}>
          <Modal.Title>Ajouter un client</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
              placeholder="CIN"
              name="cin"
              type="text"
              onChange={handleChange}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Annuler
          </Button>
          <Button variant="primary" onClick={handleAddClient}>
            Ajouter le client
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer />
    </div>
  );
}
