import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../../../store/auth";
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from "mdb-react-ui-kit";
import Button from "react-bootstrap/Button"; // Importez Button correctement depuis react-bootstrap

export default function ProfileEdit() {
  const dispatch = useDispatch();
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
    dispatch(updateProfile(formData));
  };

  return (
    <div className="gradient-custom-2 shadow p-3 mb-5 bg-white rounded" style={{ backgroundImage: 'url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMkbNiuBACRu6sLsIlT1MW4lSJlHnQG1yeVg&s")' }}>
      <MDBContainer className="py-5 h-90">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol lg="9" xl="7">
            <form onSubmit={handleSubmit}>
              <MDBInput type="text" name="nom" value={formData?.nom} label="Nom" onChange={handleChange} required />
              <MDBInput type="text" name="prenom" value={formData?.prenom} label="Prénom" onChange={handleChange} required />
              <MDBInput type="text" name="adresse" value={formData?.adresse} label="Adresse" onChange={handleChange} required />
              <MDBInput type="tel" name="telephone" value={formData?.telephone} label="Téléphone" onChange={handleChange} required />
              <MDBInput type="email" name="email" value={formData?.email} label="Email" onChange={handleChange} required />
              <div className="text-center mt-3">
                <Button type="submit">Enregistrer</Button>
              </div>
            </form>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}
