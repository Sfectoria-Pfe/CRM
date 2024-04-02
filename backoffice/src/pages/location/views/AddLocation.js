import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { sendLocation } from "../../../store/location";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
export default function AddLocation() {
  const [location, setLocation] = useState({
    date_debut: new Date(),
    date_fin: new Date(),
    image: "",
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
          setLocation((pre) => {
            return { ...pre, image: res.data.secure_url };
          });
        })
        .catch((err) => console.log(err));
    };
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      const newValue =
        name === "prix" || name === "telephone_vendeur"
          ? parseFloat(value)
          : value;
  
      setLocation({ ...location, [name]: newValue });
    };
  
    const getCurrentDate = () => {
      const currentDate = new Date();
      const formattedDate = currentDate.toISOString().slice(0, 10); // Formater en YYYY-MM-DD
      return formattedDate;
    };
  
    const handleAddLocation = () => {
      const currentDate = getCurrentDate();
      dispatch(sendLocation(location))
        .then((res) => {
          if (!res.error) {
            toast.success("Votre vente a été ajoutée avec succès !");
            setTimeout(() => {
              navigate(-1);
            }, 2000);
          } else {
            toast.error(
              "Erreur lors de l'ajout de la vente. Veuillez réessayer."
            );
          }
        })
        .catch((error) => {
          toast.error("Erreur lors de l'ajout de la vente. Veuillez réessayer.");
        });
    };
  
  return (
    <div className="form-container">
      <h2>Ajouter une location</h2>
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
          placeholder="Prix"
          name="prix"
          type="number"
          min={0}
          onChange={handleChange}
        />
      </div>
      <div className="form-input">
        <input
          className="form-control"
          placeholder="Lieu"
          name="lieu"
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
          placeholder="Nom du vendeur"
          name="nom_vendeur"
          onChange={handleChange}
        />
      </div>
      <div className="form-input">
        <input
          className="form-control"
          placeholder="Téléphone du vendeur"
          name="telephone_vendeur"
          type="number"
          min={0}
          onChange={handleChange}
        />
      </div>
      <div className="form-input">
        <input
          type="date"
          className="form-control"
          placeholder="Date de début"
          name="date_debut"
          onChange={handleChange}
        />
      </div>
      <div className="form-input">
        <input
          type="date"
          className="form-control"
          placeholder="Date de fin"
          name="date_fin"
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
      <Button
        variant="warning"
        onClick={(e) => {
          e.preventDefault();
          handleAddLocation();
        }}
        className="form-button"
      >
        Ajouter la location
      </Button>
      <ToastContainer />
    </div>
  );
}
