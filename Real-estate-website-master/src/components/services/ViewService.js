import React, { useEffect, useState } from "react";
import { Button, Row, Col, Spinner } from "react-bootstrap";
import Chat from "../chat/ChatBox";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaComments } from "react-icons/fa";

export default function ViewService() {
  const { serviceId } = useParams();
  const [openChat, setOpenChat] = useState(false);
  const [pack, setPack] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPack = async () => {
      try {
        const response = await axios.get(
          `http://localhost:7000/opportunites/${serviceId}`
        );
        setPack(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching services:", error);
        setLoading(false);
      }
    };

    fetchPack();
  }, [serviceId]);

  const chatButtonStyle = {
    width: "150px",
    height: "50px",
    borderRadius: "25px",
    backgroundColor: "#007bff",
    color: "#fff",
    fontSize: "16px",
    fontWeight: "bold",
    border: "none",
    boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    outline: "none",
    transition: "background-color 0.3s",
  };

  return (
    <div style={{ padding: "20px" }}>
      {loading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        <>
          <Row>
            {pack.service_Opportunites.map((serviceOpportunite) => (
              <Col key={serviceOpportunite?.serviceId} xs={12} sm={6} md={4} className="mb-4">
                <div style={styles.card}>
                  <img src={serviceOpportunite?.Service?.imageURL} alt={serviceOpportunite?.Service?.name} style={styles.image} />
                  <div style={styles.cardBody}>
                    <h5 style={styles.name}>{serviceOpportunite?.Service?.name}</h5>
                    <p style={styles.description}>{serviceOpportunite?.Service?.description}</p>
                    <p>Type: <span style={styles.info}>{serviceOpportunite?.Service?.type}</span></p>
                    <p>Prix: <span style={styles.info}>{serviceOpportunite?.prix}</span></p>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
          <Button
            style={chatButtonStyle}
            variant="primary"
            onClick={() => {
              setOpenChat(!openChat);
            }}
          >
            {openChat ? "Close Chat" : <><FaComments style={{ marginRight: "5px" }} /> Chat</>}
          </Button>
          <div style={{ flex: "1", paddingLeft: "20px" }}>
            {/* Affichage du chat s'il est ouvert */}
            {openChat && (
              <div style={{ width: "300%", textAlign: "right" }}>
                <Chat
                  opportunity={pack}
                  setCloseChat={() => setOpenChat(false)}
                  drawer={true}
                />
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

const styles = {
  card: {
    border: "1px solid #ccc",
    borderRadius: "10px",
    overflow: "hidden",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    transition: "box-shadow 0.3s ease",
    marginBottom: "20px",
  },
  image: {
    width: "100%",
    height: "200px",
    objectFit: "cover",
  },
  cardBody: {
    padding: "20px",
  },
  name: {
    fontSize: "1.2rem",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  description: {
    marginBottom: "10px",
  },
  info: {
    fontWeight: "bold",
  },
};
