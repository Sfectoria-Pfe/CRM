import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../../../store/auth";
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from "mdb-react-ui-kit";
import { Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { FaUser, FaAddressCard, FaPhone, FaEnvelope } from 'react-icons/fa'; // Import des icônes
export default function ProfileEdit() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.me);
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    adresse: "",
    telephone: "",
    email: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        nom: user?.Employee?.nom,
        prenom: user?.Employee?.prenom,
        adresse: user?.Employee?.adresse,
        telephone: user?.Employee?.telephone,
        email: user?.Employee?.email,
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProfile(formData))
      .then(() => {
        toast.success("Profil mis à jour avec succès !");
        navigate(-1); // Déplacer l'appel à navigate(-1) en dehors de setTimeout
      })
      .catch(() => {
        toast.error("Erreur lors de la mise à jour du profil");
      });
  };

  return (
    <div style={{ background: "linear-gradient(to bottom, #d9e3f0, #f0f0f0)", minHeight: "100vh", padding: "20px" }}>
      <ToastContainer />
      <MDBContainer>
        <MDBRow className="justify-content-center">
          <MDBCol md="8"> {/* Ajustez la taille de la colonne selon vos besoins */}
            <div style={{ backgroundColor: "white", padding: "30px", borderRadius: "10px", boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)" }}>
              <form onSubmit={handleSubmit}>
                {/* Utilisation des icônes avec les composants MDBInput */}
                <MDBInput
                  type="text"
                  name="nom"
                  value={formData?.nom}
                  label={<><FaUser /> <strong >Nom</strong></>}
                  onChange={handleChange}
                  required
                />
                <MDBInput
                  type="text"
                  name="prenom"
                  value={formData?.prenom}
                  label={<><FaUser /> <strong>Prénom</strong></>}
                  onChange={handleChange}
                  required
                />
                <MDBInput
                  type="text"
                  name="adresse"
                  value={formData?.adresse}
                  label={<><FaAddressCard /> <strong>Adresse</strong></>}
                  onChange={handleChange}
                  required
                />
                <MDBInput
                  type="tel"
                  name="telephone"
                  value={formData?.telephone}
                  label={<><FaPhone /> <strong>Téléphone</strong></>}
                  onChange={handleChange}
                  required
                />
                <MDBInput
                  type="email"
                  name="email"
                  value={formData?.email}
                  label={<><FaEnvelope /> <strong>Email</strong></>}
                  onChange={handleChange}
                  required
                />
                <div className="text-center mt-3">
                  <Button type="submit">Enregistrer</Button>
                </div>
              </form>
            </div>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}
