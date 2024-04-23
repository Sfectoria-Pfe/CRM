import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { createEmployee } from "../../store/employee";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

export default function Addemployee() {
  const [Employee, setEmployee] = useState({
    cin: "",
    nom: "",
    prenom: "",
    adresse: "",
    email: "",
    telephone: "",
  });
  const [emailError, setEmailError] = useState("");
  const [cinError, setCinError] = useState("");
  const [telephoneError, setTelephoneError] = useState("");
  
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
        setEmployee((prevEmployee) => {
          return { ...prevEmployee, image: res.data.secure_url };
        });
      })
      .catch((err) => console.log(err));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue = value; // Par défaut, conservez la valeur saisie

    // Vérification des contraintes pour différents champs
    if (name === "cin") {
      // Vérification pour CIN (doit contenir exactement 8 chiffres)
      if (value.length > 8) {
        setCinError("Le CIN doit comporter 8 chiffres au maximum.");
      } else {
        setCinError("");
      }
    } else if (name === "telephone") {
      // Vérification pour le téléphone (doit contenir exactement 8 chiffres)
      if (value.length > 8) {
        setTelephoneError("Le numéro de téléphone doit comporter 8 chiffres au maximum.");
      } else {
        setTelephoneError("");
      }
    } else if (name === "email") {
      // Vérification pour l'email (doit être au format email)
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        setEmailError("Veuillez saisir une adresse email valide.");
      } else {
        setEmailError("");
      }
    }

    // Mise à jour de l'état avec la nouvelle valeur vérifiée
    setEmployee((prevEmployee) => ({ ...prevEmployee, [name]: newValue }));
  };

  const handleAddEmployee = () => {
    // Vérification si des erreurs sont présentes
    if (cinError || emailError || telephoneError) {
      // Affichage d'un message d'erreur global
      toast.error("Veuillez corriger les erreurs dans le formulaire.");
      return;
    }

    // Envoi de la requête de création d'employé
    dispatch(createEmployee(Employee))
      .then((res) => {
        if (!res.error) {
          toast.success("Votre employé a été ajouté avec succès !");
          setTimeout(() => {
            navigate(-1);
          }, 2000);
        } else {
          toast.error(
            "Erreur lors de l'ajout de l'employé. Veuillez réessayer."
          );
        }
      })
      .catch((error) => {
        toast.error(
          "Erreur lors de l'ajout de l'employé. Veuillez réessayer."
        );
      });
  };

  return (
    <div className="form-container">
      <h2>Ajouter un employé</h2>
      <div className="form-input">
        <input
          className="form-control"
          placeholder="CIN"
          name="cin"
          onChange={handleChange}
        />
        {cinError && <p className="text-danger">{cinError}</p>}
      </div>
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
          placeholder="Prénom"
          name="prenom"
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
          placeholder="Email"
          name="email"
          onChange={handleChange}
        />
        {emailError && <p className="text-danger">{emailError}</p>}
      </div>
      <div className="form-input">
        <input
          className="form-control"
          placeholder="Téléphone"
          name="telephone"
          onChange={handleChange}
        />
        {telephoneError && <p className="text-danger">{telephoneError}</p>}
      </div>
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
      <Button
        variant="warning"
        onClick={(e) => {
          e.preventDefault();
          handleAddEmployee();
        }}
        className="form-button"
        style={{ backgroundColor: "blue" }}
      >
        Ajouter l'employé
      </Button>
      <ToastContainer />
    </div>
  );
}
