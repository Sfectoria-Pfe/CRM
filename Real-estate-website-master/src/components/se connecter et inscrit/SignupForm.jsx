import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signupClient } from "../store/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./SignupForm.css"; // Importer le fichier CSS avec les styles
import axios from "axios";

export default function AddClient() {
  const [client, setClient] = useState({
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
        setClient((pre) => {
          return { ...pre, image: res.data.secure_url };
        });
      })
      .catch((err) => console.log(err));
  };
  const handleChange = (e) => {
    const { name, value } = e.target;

    setClient({ ...client, [name]: value });
  };
  const handleAddClient = () => {
    dispatch(signupClient(client))
      .then((res) => {
        if (!res.error) {
          toast.success("Votre compte a été ajouté avec succès !");
          setTimeout(() => {
            navigate('/profile');
          }, 2000);
        } else {
          toast.error("Erreur lors de l'ajout du compte. Veuillez réessayer.");
        }
      })
      .catch((error) => {
        toast.error("Erreur lors de l'ajout du compte. Veuillez réessayer.");
      });
  };

  return (
    <form className="signup-form" onSubmit={handleAddClient}>
      {" "}
      {/* Appliquer la classe signup-form */}
      <h2>Créer un compte</h2>
      <div className="form-input">
        <div className="form-input">
          <input
            type="file"
            className="form-control"
            placeholder="URL de l'image"
            name="image"
            onChange={handleFile}
          />
          <br />
          <br />
          {image && <img src={image} alt="Uploaded" />}
        </div>
        <input
          className="form-control"
          placeholder="Nom"
          name="nom"
          required
          onChange={handleChange}
        />
      </div>
      <div className="form-input">
        <input
          className="form-control"
          placeholder="Prénom"
          name="prenom"
          required
          onChange={handleChange}
        />
      </div>
      <div className="form-input">
        <input
          className="form-control"
          placeholder="Email"
          name="email"
          type="email"
          required
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
          type="number"
          onChange={handleChange}
        />
      </div>
      <div className="form-input">
        <input
          className="form-control"
          placeholder="Mot de passe"
          name="password"
          type="password"
          required
          onChange={handleChange}
        />
      </div>
      <Button
        variant="warning"
        onSubmit={handleAddClient}
        className="button"
        type="submit"
        style={{ backgroundColor: "#28a745" }}
      >
        Enregistrer
      </Button>
      <ToastContainer />
    </form>
  );
}
