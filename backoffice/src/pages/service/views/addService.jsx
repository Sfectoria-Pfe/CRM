import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { sendService } from "../../../store/services";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

export default function AddService() {
  const [service, setService] = useState({
    name: "",
    description: "",
    type: "", // Utilisation de TypeService
    price: 0,
    imageURL: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const preset_key = "f20pgg9j";
  const cloud_name = "dp6nkc5wl";
  const [image, setImage] = useState("");

  const handleFile = (event) => {
    const file = event.target.files[0];
    console.log("Fichier sélectionné :", file);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", preset_key);
    axios
      .post(
        `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
        formData
      )
      .then((res) => {
        setImage(res.data.secure_url);
        setService((prevService) => ({
          ...prevService,
          imageURL: res.data.secure_url,
        }));
      })
      .catch((err) => console.log(err));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newValue =
      name === "price" ? parseFloat(value) : value;

    setService({ ...service, [name]: newValue });
  };

  const handleAddService = () => {
    dispatch(sendService(service))
      .then((res) => {
        if (!res.error) {
          toast.success("Votre service a été ajouté avec succès !");
          setTimeout(() => {
            navigate();
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
          name="name"
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
        <select
          className="form-control"
          name="type"
          onChange={handleChange}
        >
          <option value="">Sélectionnez un type</option>
          <option value="vente">Vente</option>
          <option value="location">Location</option>
          <option value="autre">Autre</option>
        </select>
      </div>
      <div className="form-input">
        <input
          className="form-control"
          placeholder="Prix"
          name="price"
          type="number"
          min={0}
          onChange={handleChange}
        />
      </div>
      <div className="form-input">
        <input
          type="file"
          className="form-control"
          name="image"
          onChange={handleFile}
        />
      </div>
      <Button variant="warning" onClick={handleAddService} className="form-button">
        Ajouter le service
      </Button>
      <ToastContainer />
    </div>
  );
}
