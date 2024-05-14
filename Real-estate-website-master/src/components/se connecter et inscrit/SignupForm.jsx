import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signupClient } from "../store/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./SignupForm.css"; // Importer le fichier CSS avec les styles
import axios from "axios";

import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBInput
} from 'mdb-react-ui-kit';

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
  const handleAddClient = (e) => {
    e.preventDefault(); // Empêcher le comportement par défaut du formulaire
  
    // Récupérer l'e-mail et le numéro de téléphone depuis l'état client
    const { email, telephone } = client;
  
    // Validation de l'e-mail pour qu'il soit de type Gmail
    if (!email.endsWith('@gmail.com')) {
      toast.error("Veuillez saisir une adresse e-mail Gmail valide !");
      return; // Arrêter la soumission du formulaire
    }
  
    // Validation du numéro de téléphone pour qu'il comporte exactement 8 chiffres
    const phoneNumberRegex = /^\d{8}$/;
    if (!phoneNumberRegex.test(telephone)) {
      toast.error("Veuillez saisir un numéro de téléphone valide (8 chiffres) !");
      return; // Arrêter la soumission du formulaire
    }
  
    // Si les validations passent, envoyer la demande d'inscription
    dispatch(signupClient(client))
      .then((res) => {
        if (!res.error) {
          toast.success("Votre compte a été ajouté avec succès !");
          setTimeout(() => {
            navigate("/profile");
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
    <MDBContainer className="my-5">
      <MDBCard>
        <MDBRow className='g-0'>
          <MDBCol md='6'>
            <MDBCardImage src='https://www.smoothtalker.com/wp-content/uploads/2021/10/php-login-and-authentication-the-definitive-guide.png'/>
          </MDBCol>
          <MDBCol md='6'>
            <MDBCardBody className='d-flex flex-column'>
              <div className='d-flex flex-row mt-2'>
                <MDBIcon fas icon="cubes fa-3x me-3" style={{ color: '#1BBFA8' }}/>
                <span className="h1 fw-bold mb-0">Maison+</span>
              </div>
              <form onSubmit={handleAddClient}>
  <h2>Créer un compte</h2>
  <div className="form-input">
    <div className="form-input">
      <MDBInput 
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
    <MDBInput
      className="form-control"
      placeholder="Nom"
      name="nom"
      required
      onChange={handleChange}
    />
  </div>
  <div className="form-input">
    <MDBInput
      className="form-control"
      placeholder="Prénom"
      name="prenom"
      required
      onChange={handleChange}
    />
  </div>
  <div className="form-input">
    <MDBInput
      className="form-control"
      placeholder="Email"
      name="email"
      type="email"
      required
      onChange={handleChange}
    />
  </div>
  <div className="form-input">
    <MDBInput
      className="form-control"
      placeholder="Adresse"
      name="adresse"
      onChange={handleChange}
    />
  </div>
  <div className="form-input">
    <MDBInput
      className="form-control"
      placeholder="Téléphone"
      name="telephone"
      type="number"
      onChange={handleChange}
    />
  </div>
  <div className="form-input">
    <MDBInput
      className="form-control"
      placeholder="Mot de passe"
      name="password"
      type="password"
      required
      onChange={handleChange}
    />
  </div>
  <button
    type="submit"
    className="btn btn-dark"
    style={{ backgroundColor: "#28a745" }}
  >
    Enregistrer
  </button>
</form>

    <ToastContainer />

    </MDBCardBody>
          </MDBCol>
        </MDBRow>
      </MDBCard>
    </MDBContainer>
  );
}
