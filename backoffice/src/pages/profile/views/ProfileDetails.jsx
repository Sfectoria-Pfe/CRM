import React, { useContext } from "react";
import { UserContext } from "../../../router/Router";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaUser, FaBuilding, FaAddressCard, FaPhone } from 'react-icons/fa';

export default function ProfileDetails() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  return (
    <section className="profile-details-background">
      <Card className="shadow" style={{ width: "24rem" }}>
      <Card.Img variant="top" src={user.imageUrl} style={{ width: "380px" , height:"170px" }} />
        <Card.Body>
          <div className="d-flex align-items-center mb-3">
            <FaUser className="me-2" />
            <strong className="me-2 text-primary">Nom:</strong> <strong>{user.userName} {user.userPrenom}</strong>
          </div>
          <div className="d-flex align-items-center mb-3">
            <FaBuilding className="me-2" />
            <strong className="me-2 text-primary">Entreprise:</strong> <strong>{user.userentreprise}</strong>
          </div>
          <div className="d-flex align-items-center mb-3">
            <FaAddressCard className="me-2" />
            <strong className="me-2 text-primary">Adresse:</strong> <strong>{user.Adresse}</strong>
          </div>
          <div className="d-flex align-items-center mb-3">
            <FaEnvelope className="me-2" />
            <strong className="me-2 text-primary">Email:</strong> <strong>{user.email}</strong>
          </div>
          <div className="d-flex align-items-center mb-3">
            <FaPhone className="me-2" />
            <strong className="me-2 text-primary">Téléphone:</strong> <strong>{user.tel}</strong>
          </div>
          <div className="d-flex justify-content-end">
            <Button variant="warning" onClick={() => navigate("edit")}>
              <i className="fa fa-pencil"></i> Edit
            </Button>
          </div>
        </Card.Body>
      </Card>
    </section>
  );
}
