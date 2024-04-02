import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { sendStage_client } from "../../store/stage_client";

export default function AddStageClient() {
  const [stageClient, setStageClient] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newValue = name === "clientId" || name=== "stageId" ? parseInt(value) : value;

    setStageClient({ ...stageClient, [name]: newValue });
  };

  const handleAddStageClient = () => {
    dispatch(sendStage_client(stageClient))
      .then((res) => {
        if (!res.error) {
          toast.success("Le stage client a été ajouté avec succès !");
          setTimeout(() => {
            navigate(-1);
          }, 2000);
        } else {
          toast.error("Erreur lors de l'ajout du stage client. Veuillez réessayer.");
        }
      })
      .catch((error) => {
        toast.error("Erreur lors de l'ajout du stage client. Veuillez réessayer.");
      });
  };

  return (
    <div className="form-container">
      <h2>Ajouter un stage client</h2>
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
          placeholder="ID du client"
          name="clientId"
          type="number"
          onChange={handleChange}
        />
      </div>
      <div className="form-input">
        <input
          className="form-control"
          placeholder="ID du stage"
          name="stageId"
          type="number"
          onChange={handleChange}
        />
      </div>
      <Button variant="warning" onClick={handleAddStageClient} className="form-button">
        Ajouter le stage client
      </Button>
      <ToastContainer />
    </div>
  );
}
