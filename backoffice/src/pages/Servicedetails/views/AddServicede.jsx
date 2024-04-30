import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { sendServiceDetail } from "../../../store/serviceDetails";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

export default function AddServiceDetail() {
  const [serviceDetail, setServiceDetail] = useState({
    title: "",
    description: "",
    address: "",
    price: 0,
    imageURL: "",
    serviceId: 0, // Remplissez ceci avec l'ID du service auquel le détail est associé
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
        setServiceDetail((prevServiceDetail) => ({
          ...prevServiceDetail,
          imageURL: res.data.secure_url,
        }));
      })
      .catch((err) => console.log(err));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newValue = name === "price" ? parseFloat(value) : name === "serviceId" ? parseInt(value) : value;

    setServiceDetail({ ...serviceDetail, [name]: newValue });
  };

  const handleAddServiceDetail = () => {
    dispatch(sendServiceDetail(serviceDetail))
      .then((res) => {
        if (!res.error) {
          toast.success("Le détail de service a été ajouté avec succès !");
          setTimeout(() => {
            navigate(0);
          }, 2000); // Redirige après 2 secondes
        } else {
          toast.error("Erreur lors de l'ajout du détail de service. Veuillez réessayer.");
        }
      })
      .catch((error) => {
        toast.error("Erreur lors de l'ajout du détail de service. Veuillez réessayer.");
      });
  };

  return (
    <div className="form-container">
      <h2>Ajouter un détail de service</h2>
      <div className="form-input">
        <input
          className="form-control"
          placeholder="Titre"
          name="title"
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
          placeholder="Adresse"
          name="address"
          onChange={handleChange}
        />
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
          className="form-control"
          placeholder="serviceId"
          name="serviceId"
          type="number"
          min={0}
          onChange={handleChange}
        />
      </div>
      <div className="form-input">
        <input
          type="file"
          className="form-control"
          name="imageURL"
          onChange={handleFile}
        />
      </div>
      <Button variant="warning" onClick={handleAddServiceDetail} className="form-button">
        Ajouter le détail de service
      </Button>
      <ToastContainer />
    </div>
  );
}
