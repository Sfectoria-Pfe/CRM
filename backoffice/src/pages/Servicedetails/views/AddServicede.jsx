import React, { useState, useEffect } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { sendServiceDetail } from "../../../store/serviceDetails";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { fetchServices } from "../../../store/services";

export default function AddServiceDetail({ toggleAddDetailForm }) {
  const [serviceDetail, setServiceDetail] = useState({
    title: "",
    description: "",
    address: "",
    price: 0,
    imageURL: "",
    serviceId: null, // initialisé à null par défaut
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const services = useSelector((state) => state.service.services.items);
  const { serviceId } = useParams(); // Récupérer l'ID du service depuis les paramètres d'URL

  useEffect(() => {
    dispatch(fetchServices());
    // Mettre à jour le serviceId dans le state du formulaire avec l'ID du service actuellement affiché
    setServiceDetail((prevServiceDetail) => ({
      ...prevServiceDetail,
      serviceId: parseInt(serviceId),
    }));
  }, [dispatch, serviceId]);

  const preset_key = "f20pgg9j";
  const cloud_name = "dp6nkc5wl";
  const [image, setImage] = useState("");

  const handleFile = (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", preset_key);
    axios
      .post(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, formData)
      .then((res) => {
        setImage(res.data.secure_url);
        setServiceDetail((prevServiceDetail) => ({
          ...prevServiceDetail,
          imageURL: res.data.secure_url,
        }));
      })
      .catch((err) => console.log(err));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newValue = name === "price" || name === "serviceId" ? parseInt(value) : value;

    setServiceDetail({ ...serviceDetail, [name]: newValue });
  };

  const handleAddServiceDetail = () => {
    dispatch(sendServiceDetail(serviceDetail))
      .then((res) => {
        if (!res.error) {
          toast.success("Le détail de service a été ajouté avec succès !");
          setTimeout(() => {
          }, 2000);
        } else {
          toast.error("Erreur lors de l'ajout du détail de service. Veuillez réessayer.");
        }
      })
      .catch((error) => {
        toast.error("Erreur lors de l'ajout du détail de service. Veuillez réessayer.");
      });
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={() => toggleAddDetailForm(true)}>Ajouter Détail du Service</Button>
      {/* Conditionner l'affichage du formulaire d'ajout en fonction de l'état */}
      <Modal show={true} onHide={() => toggleAddDetailForm(false)} dialogClassName="modal-sidebar"style={{padding:"40px"}}>
        <Modal.Header closeButton>
          <Modal.Title>Ajouter un détail de service</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formTitle">
              <Form.Label>Titre</Form.Label>
              <Form.Control
                type="text"
                placeholder="Titre"
                name="title"
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Description"
                name="description"
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formAddress">
              <Form.Label>Adresse</Form.Label>
              <Form.Control
                type="text"
                placeholder="Adresse"
                name="address"
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formPrice">
              <Form.Label>Prix</Form.Label>
              <Form.Control
                type="number"
                placeholder="Prix"
                name="price"
                onChange={handleChange}
              />
            </Form.Group>

            {/* Le champ serviceId est initialisé automatiquement avec l'ID du service actuellement affiché */}
            <input type="hidden" name="serviceId" value={serviceDetail.serviceId} />

            <Form.Group controlId="formImage">
              <Form.Label>Image</Form.Label>
              <Form.Control type="file" name="imageURL" onChange={handleFile} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => toggleAddDetailForm(false)}>Fermer</Button>
          <Button variant="primary" onClick={handleAddServiceDetail}>Ajouter</Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer />
    </div>
  );
}
