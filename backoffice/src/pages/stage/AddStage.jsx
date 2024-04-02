import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { sendStage } from "../../store/stage";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddStage = () => {
  const [stage, setStage] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newValue = name === "opportuniteId" ? parseInt(value) : value;
    setStage({ ...stage, [name]: newValue });
  };

  const handleAddStage = () => {
    dispatch(sendStage(stage))
      .then((res) => {
        if (!res.error) {
          toast.success("Le stage a été ajouté avec succès !");
          setTimeout(() => {
            navigate(-1);
          }, 2000);
        } else {
          toast.error("Erreur lors de l'ajout du stage. Veuillez réessayer.");
        }
      })
      .catch((error) => {
        toast.error("Erreur lors de l'ajout du stage. Veuillez réessayer.");
      });
  };

  return (
    <div className="form-container">
      <h2>Ajouter un stage</h2>
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
          placeholder="ID Opportunité"
          name="opportuniteId"
          type="number"
          onChange={handleChange}
        />
      </div>
      <Button variant="warning" onClick={handleAddStage} className="form-button">
        Ajouter le stage
      </Button>
      <ToastContainer />
    </div>
  );
};

export default AddStage;
