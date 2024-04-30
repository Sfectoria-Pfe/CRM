import React, { useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import { UserContext } from "../../../router/Router";
import { useNavigate } from "react-router-dom";
import { FaUser, FaBuilding, FaEnvelope, FaPhone, FaIdCard } from 'react-icons/fa';

export default function EditProfile() {
  const { user, setUser } = useContext(UserContext) || { user: {}, setUser: () => {} }; // Provide a default value if context is undefined
  const navigate = useNavigate();

  // État local pour stocker les informations mises à jour
  const [updatedUser, setUpdatedUser] = useState({
    cin: user.Employee ? user.Employee.cin || "" : "",
    nom: user.Employee ? user.Employee.nom || "" : "",
    prenom: user.Employee ? user.Employee.prenom || "" : "",
    adresse: user.Employee ? user.Employee.adresse || "" : "",
    email: user.Employee ? user.Employee.email || "" : "",
    telephone: user.Employee ? user.Employee.telephone || "" : ""
  });

  // Gestion de la modification des champs de formulaire
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser({ ...updatedUser, [name]: value });
  };

  // Gestion de la soumission du formulaire de mise à jour
  const handleSaveClick = () => {
    // Mettre à jour l'utilisateur avec les nouvelles informations
    setUser({ ...user, Employee: { ...user.Employee, ...updatedUser } });
    // Rediriger l'utilisateur vers la page de profil
    navigate("/profile");
  };

  return (
    <section style={{ backgroundColor: "#eee" }} className="d-flex justify-content-center p-5">
      <Card className="shadow" style={{ width: "24rem" }}>
        <Card.Body>
          <Form>
            <Form.Group className="mb-3" controlId="cin">
              <Form.Label><FaIdCard className="me-2" />CIN</Form.Label>
              <Form.Control type="text" name="cin" value={updatedUser.cin} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="nom">
              <Form.Label><FaUser className="me-2" />Nom</Form.Label>
              <Form.Control type="text" name="nom" value={updatedUser.nom} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="prenom">
              <Form.Label><FaUser className="me-2" />Prénom</Form.Label>
              <Form.Control type="text" name="prenom" value={updatedUser.prenom} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="adresse">
              <Form.Label><FaBuilding className="me-2" />Adresse</Form.Label>
              <Form.Control type="text" name="adresse" value={updatedUser.adresse} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label><FaEnvelope className="me-2" />Email</Form.Label>
              <Form.Control type="email" name="email" value={updatedUser.email} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="telephone">
              <Form.Label><FaPhone className="me-2" />Téléphone</Form.Label>
              <Form.Control type="text" name="telephone" value={updatedUser.telephone} onChange={handleInputChange} />
            </Form.Group>
            <Button variant="success" onClick={handleSaveClick}>Modifier le profil</Button>
          </Form>
        </Card.Body>
      </Card>
    </section>
  );
}

