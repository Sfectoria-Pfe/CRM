import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchService } from "../../../store/services";
import { Link, useParams } from "react-router-dom";


import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete"; // Importer les icônes Edit et Delete
import { deleteServiceDetail, updateServiceDetail } from "../../../store/serviceDetails"; // Importer l'action deleteServiceDetail et updateServiceDetail

export default function OneService() {
  const dispatch = useDispatch();
  const { serviceId } = useParams();
  const service = useSelector((state) => state.service.service);
  const serviceDetails = useSelector(
    (state) => state.serviceDetails.serviceDetails.items
  );

  useEffect(() => {
    dispatch(fetchService(serviceId));
  }, [dispatch, serviceId]);

  const filteredServiceDetails = serviceDetails.filter(
    (detail) => detail.serviceId === parseInt(serviceId)
  );

  const cardStyle = {
    width: "300px", // Définir une largeur fixe pour chaque carte
    margin: "10px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  };

  const imageStyle = {
    width: "100%",
    height: "150px",
    objectFit: "cover",
  };

  // État pour gérer l'édition
  const [editedDetail, setEditedDetail] = useState(null);

  // Fonction de gestion d'événements pour démarrer l'édition d'un détail de service
  const startEditDetail = (detail) => {
    setEditedDetail({ ...detail });
  };

  // Fonction de gestion d'événements pour annuler l'édition
  const cancelEditDetail = () => {
    setEditedDetail(null);
  };

  // Fonction de gestion d'événements pour enregistrer les modifications
  const saveEditedDetail = () => {
    dispatch(updateServiceDetail({ id: editedDetail.id, body: editedDetail }));
    setEditedDetail(null);
  };

  // Fonction de gestion d'événements pour supprimer un détail de service
  const handleDeleteDetail = (id) => {
    dispatch(deleteServiceDetail(id)); // Appeler l'action deleteServiceDetail avec l'ID du détail de service à supprimer
  };

  // Fonction de gestion d'événements pour mettre à jour les détails modifiés
  const handleEditChange = (e) => {
    setEditedDetail({ ...editedDetail, [e.target.name]: e.target.value });
  };

  return (
    <div style={{ padding: "20px", backgroundColor: "#f9f9f9", borderRadius: "10px", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" }}>
      <h2 style={{ color: "#1976D2", marginBottom: "20px", borderBottom: "2px solid #1976D2", paddingBottom: "10px" }}>plus des informations sur  Service Associé</h2>
      <div style={{ marginBottom: "20px" }}>
        <Typography variant="h5" style={{ color: "#333", marginBottom: "10px" }}>
          Nom: <span style={{ fontWeight: "bold" }}>{service?.name}</span>
        </Typography>
        <Typography variant="h5" style={{ color: "#333", marginBottom: "10px" }}>
          Type: <span style={{ fontWeight: "bold" }}>{service?.type}</span>
        </Typography>
        <Typography variant="h5" style={{ color: "#333", marginBottom: "10px" }}>
          Prix: <span style={{ fontWeight: "bold" }}>{service?.price}</span>
        </Typography>
        <Typography variant="h5" style={{ color: "#333" }}>
          Description:
        </Typography>
        <Typography variant="body1" style={{ paddingLeft: "20px", color: "#555" }}>
          {service?.description}
        </Typography>
      </div>
      <Link to={`/servicesdetails/addservicedetails`} style={{ textDecoration: "none" }}>
        <Button variant="contained" color="primary" style={{ marginBottom: "20px" }}>
          Ajouter Détail du Service
        </Button>
      </Link>
      <div>
        <h3 style={{ color: "#1976D2", marginBottom: "10px" }}>Détails des Services Associés</h3>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {filteredServiceDetails.map((detail) => (
            <Card key={detail.id} style={cardStyle}>
              <CardContent>
                <img src={detail.imageURL} alt="Image Service" style={imageStyle} />
                {editedDetail && editedDetail.id === detail.id ? (
                  // Afficher le formulaire d'édition
                  <EditForm
                    editedDetail={editedDetail}
                    handleEditChange={handleEditChange}
                    cancelEditDetail={cancelEditDetail}
                    saveEditedDetail={saveEditedDetail}
                  />
                ) : (
                  // Afficher les détails normaux
                  <>
                    <Typography variant="h5" style={{ color: "#333", marginBottom: "10px" }}>
                      {detail.title}
                    </Typography>
                    <Typography variant="body1" style={{ color: "#555" }}>
                      {detail.description}
                    </Typography>
                    <Typography variant="body2" style={{ color: "#888" }}>
                      Adresse: {detail.address}
                    </Typography>
                    <Typography variant="body2" style={{ color: "#888" }}>
                      Prix: {detail.price}
                    </Typography>
                  </>
                )}
                {/* Ajouter les icônes d'édition et de suppression */}
                <IconButton aria-label="edit" onClick={() => startEditDetail(detail)}>
                  <EditIcon />
                </IconButton>
                <IconButton aria-label="delete" onClick={() => handleDeleteDetail(detail.id)}>
                  <DeleteIcon className="deleteIcon" style={{ color: "red" }} />
                </IconButton>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

// Composant de formulaire d'édition
function EditForm({ editedDetail, handleEditChange, cancelEditDetail, saveEditedDetail }) {
  return (
    <div style={{ position: "absolute", bottom: "0", left: "50%", transform: "translate(-50%, 50%)", backgroundColor: "#81d4fa", padding: "20px", borderRadius: "10px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", zIndex: 9999, width: "400px" }}>
      <Typography variant="h6" style={{ marginBottom: "10px" }}>
        Modifier le détail
      </Typography>
      <div style={{ marginBottom: "10px" }}>
        <label>
          Titre:
          <input
            type="text"
            name="title"
            value={editedDetail.title}
            onChange={handleEditChange}
            required
            style={{ width: "100%", padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}
          />
        </label>
      </div>
      <div style={{ marginBottom: "10px" }}>
        <label>
          Description:
          <textarea
            name="description"
            value={editedDetail.description}
            onChange={handleEditChange}
            rows={4}
            required
            style={{ width: "100%", padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}
          />
        </label>
      </div>
      <div style={{ marginBottom: "10px" }}>
        <label>
          Adresse:
          <input
            type="text"
            name="address"
            value={editedDetail.address}
            onChange={handleEditChange}
            style={{ width: "100%", padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}
          />
        </label>
      </div>
      <div style={{ marginBottom: "10px" }}>
        <label>
          Prix:
          <input
            type="text"
            name="price"
            value={editedDetail.price}
            onChange={handleEditChange}
            required
            style={{ width: "100%", padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}
          />
        </label>
      </div>
      <Button onClick={saveEditedDetail} variant="contained" color="primary" style={{ marginRight: "10px" }}>
        Enregistrer
      </Button>
      <Button onClick={cancelEditDetail} variant="contained">
        Annuler
      </Button>
    </div>
  );
}