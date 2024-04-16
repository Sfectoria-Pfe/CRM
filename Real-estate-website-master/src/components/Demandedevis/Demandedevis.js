import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { sendDemandeDevis } from "../store/demande";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Demandedevis.css';

const getCurrentDate = () => {
  const currentDate = new Date();
  const formattedDate = currentDate.toISOString().slice(0, 10);
  return formattedDate;
};

export default function AddDemandeDevis() {
  const [demandeDevis, setDemandeDevis] = useState({
    dateDemande: getCurrentDate(),
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newValue = name === "clientId" ? parseInt(value) : value; 
    setDemandeDevis({ ...demandeDevis, [name]: newValue });
  };

  const handleAddDemandeDevis = () => {
    dispatch(sendDemandeDevis(demandeDevis))
      .then((res) => {
        if (!res.error) {
          toast.success("La demande de devis a été ajoutée avec succès !");
          setTimeout(() => {
            navigate(-1);
          }, 2000);
        } else {
          toast.error("Erreur lors de l'ajout de la demande de devis. Veuillez réessayer.");
        }
      })
      .catch((error) => {
        toast.error("Erreur lors de l'ajout de la demande de devis. Veuillez réessayer.");
      });
  };

  return (
    <div className="form-container"> {/* Appliquer la classe CSS demande-container */}
      <div className="form-control"> {/* Appliquer la classe CSS form-container */}
        <h2>Ajouter une demande de devis</h2>
        <div className="form-input mb-3"> {/* Appliquer les classes CSS form-input et mb-3 */}
          <input
            className="form-control"
            placeholder="Date de demande"
            name="dateDemande"
            type="date"
            value={demandeDevis.dateDemande}
            onChange={handleChange}
          />
        </div>
        <div className="form-input mb-3"> {/* Appliquer les classes CSS form-input et mb-3 */}
          <input
            className="form-control"
            placeholder="Description"
            name="description"
            onChange={handleChange}
          />
        </div>
        <div className="form-input mb-3"> {/* Appliquer les classes CSS form-input et mb-3 */}
          <input
            className="form-control"
            placeholder="Sujet"
            name="sujet"
            onChange={handleChange}
          />
        </div>
        <div className="form-input mb-3"> {/* Appliquer les classes CSS form-input et mb-3 */}
          <input
            className="form-control"
            placeholder="ID du client"
            name="clientId"
            type="number"
            onChange={handleChange}
          />
        </div>

        <Button className="custom-button" onClick={handleAddDemandeDevis} >
          Ajouter 
        </Button>
        <ToastContainer />
      </div>
    </div>
  );
}
