import React, { useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import { UserContext } from "../../../router/Router";
import { useNavigate } from "react-router-dom";
import { FaUser, FaBuilding, FaEnvelope, FaPhone, FaIdCard } from 'react-icons/fa'; // Importation des icônes

export default function EditProfile() {
  const [updatedUser, setUpdatedUser] = useState({});
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser({ ...updatedUser, [name]: value });
  };

  const handleSaveClick = () => {
    setUser({ ...user, ...updatedUser });
    navigate(-1);
  };

  return (
    <section style={{ backgroundColor: "#eee" }} className="d-flex justify-content-center p-5">
      <Card className="shadow" style={{ width: "24rem" }}>
        <Card.Body>
          <Form>
            <Form.Group className="mb-3" controlId="cin">
              <Form.Label><FaIdCard className="me-2" />CIN</Form.Label>
              <Form.Control type="text" name="cin" defaultValue={user.cin} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="userName">
              <Form.Label><FaUser className="me-2" />Nom</Form.Label>
              <Form.Control type="text" name="userName" defaultValue={user.userName} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="userPrenom">
              <Form.Label><FaUser className="me-2" />Prénom</Form.Label>
              <Form.Control type="text" name="userPrenom" defaultValue={user.userPrenom} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="userentreprise">
              <Form.Label><FaBuilding className="me-2" />Entreprise</Form.Label>
              <Form.Control type="text" name="userentreprise" defaultValue={user.userentreprise} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="Adresse">
              <Form.Label><FaBuilding className="me-2" />Adresse</Form.Label>
              <Form.Control type="text" name="Adresse" defaultValue={user.Adresse} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label><FaEnvelope className="me-2" />Email</Form.Label>
              <Form.Control type="email" name="email" defaultValue={user.email} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="Age">
              <Form.Label><FaUser className="me-2" />Age</Form.Label>
              <Form.Control type="text" name="Age" defaultValue={user.Age} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="tel">
              <Form.Label><FaPhone className="me-2" />Téléphone</Form.Label>
              <Form.Control type="text" name="tel" defaultValue={user.tel} onChange={handleInputChange} />
            </Form.Group>
            <Button variant="success" onClick={handleSaveClick}>Enregistrer</Button>
          </Form>
        </Card.Body>
      </Card>
    </section>
  );
}
