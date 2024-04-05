import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { createEmployee } from "../../store/employee"; 

export default function SignUp() {
  const dispatch = useDispatch();

  const [userData, setUserData] = useState({
    cin: "",
    nom: "",
    prenom: "",
    adresse: "",
    email: "",
    telephone: "",
    role: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Dispatchez l'action createEmployee avec les données du nouvel employé
    dispatch(createEmployee(userData));
  };

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="cin">
              <Form.Label>CIN</Form.Label>
              <Form.Control name="cin" type="text" value={userData.cin} onChange={handleChange} required />
            </Form.Group>
            <Form.Group controlId="nom">
              <Form.Label>Nom</Form.Label>
              <Form.Control name="nom" type="text" value={userData.nom} onChange={handleChange} required />
            </Form.Group>
            <Form.Group controlId="prenom">
              <Form.Label>Prénom</Form.Label>
              <Form.Control name="prenom" type="text" value={userData.prenom} onChange={handleChange} required />
            </Form.Group>
            <Form.Group controlId="adresse">
              <Form.Label>Adresse</Form.Label>
              <Form.Control name="adresse" type="text" value={userData.adresse} onChange={handleChange} required />
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control name="email" type="email" value={userData.email} onChange={handleChange} required />
            </Form.Group>
            <Form.Group controlId="telephone">
              <Form.Label>Téléphone</Form.Label>
              <Form.Control name="telephone" type="tel" value={userData.telephone} onChange={handleChange} required />
            </Form.Group>
            <Form.Group controlId="role">
              <Form.Label>Rôle</Form.Label>
              <Form.Select className="mb-4" name="role" value={userData.role} onChange={handleChange} required>
                <option value="">Sélectionner le rôle</option>
                <option value="admin">Admin</option>
                <option value="chef">Chef</option>
                <option value="commercial">Commercial</option>
              </Form.Select>
            </Form.Group>
            <Button variant="primary" type="submit">
              S'inscrire
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
