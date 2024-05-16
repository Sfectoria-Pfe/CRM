import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { sendStage_client } from "../../store/stage_client";
import { Autocomplete, Box, TextField } from "@mui/material";
import { fetchClients } from "../../store/client";
import { fetchOpportunite } from "../../store/opportunite";

export default function AddStageClient({ stageId, preFilledStageId, opportunityId }) {
  const [stageClient, setStageClient] = useState({
    stageId: preFilledStageId,
    clientId: "", // Use preFilledStageId as the initial value
  });
  const [internalStageId, setInternalStageId] = useState(preFilledStageId); // Internal state for stageId
  const [showModal, setShowModal] = useState(false); // Etat pour contrôler l'affichage du modal
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [client, setClient] = useState({ id: "", nom: "", prenom: "" });
  useEffect(() => {
    dispatch(fetchClients());
  }, [dispatch]);
  const clients = useSelector((state) => state.client.clients.items);
  const handleChange = (e) => {
    const { name, value } = e.target;
    const newValue = name === "clientId" ? parseInt(value) : value;

    setStageClient({ ...stageClient, [name]: newValue });
  };

  const handleAddStageClient = () => {
    console.log(stageClient);
    // Include internalStageId when sending the request
    dispatch(sendStage_client({ ...stageClient, stageId: internalStageId, clientId: client.id }))
      .then((res) => {
        if (!res.error) {
          toast.success("Le stage client a été ajouté avec succès !");
          dispatch(fetchOpportunite(opportunityId));
          handleClose(); // Fermer le modal après l'ajout
        } else {
          toast.error("Erreur lors de l'ajout du stage client. Veuillez réessayer.");
        }
      })
      .catch((error) => {
        toast.error("Erreur lors de l'ajout du stage client. Veuillez réessayer.");
      });
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const handleOpen = () => {
    setShowModal(true);
  };

  return (
    <>
      <Button variant="warning" onClick={handleOpen}>
        Ajouter un stage client
      </Button>

      <Modal show={showModal} onHide={handleClose} style={{
        padding:"50px"
      }} >
        <Modal.Header closeButton>
          <Modal.Title>Ajouter un stage client</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-container white-bg">
            <div className="form-input">
              <input
                className="form-control"
                placeholder="Description"
                name="description"
                onChange={handleChange}
              />
            </div>
            <div className="form-input">
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={clients}
                renderOption={(props, option) => (
                  <Box
                    component="li"
                    sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                    {...props}
                  >
                    {option.nom} ({option.prenom})
                  </Box>
                )}
                value={client?.nom || '' + "" + client?.prenom || ''}
                onChange={(event, newValue) => {
                  setClient(newValue);
                }}
                renderInput={(params) => <TextField {...params} label="Client" />}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Annuler
          </Button>
          <Button variant="primary" onClick={handleAddStageClient}>
            Ajouter
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer />
    </>
  );
}