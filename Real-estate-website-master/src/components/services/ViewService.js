import { faFacebookMessenger } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Button, Row, Col } from "react-bootstrap";
import Chat from "../chat/ChatBox";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function ViewService() {
  const { serviceId } = useParams();
  const [openChat, setOpenChat] = useState(false);
  const [pack, setPack] = useState(null);

  useEffect(() => {
    const fetchPack = async () => {
      try {
        const response = await axios.get(
          `http://localhost:7000/opportunites/${serviceId}`
        );
        setPack(response.data);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchPack();
  }, [serviceId]);

  return (
    <div>
      {pack && (
        <>
          <Row>
            {pack.service_Opportunites.map((serviceOpportunite) => (
              <Col key={serviceOpportunite?.serviceId} xs={12} sm={6} md={4} className="mb-4">
                <div className="custom-card-background">
                  <img src={serviceOpportunite?.Service?.imageURL} alt={serviceOpportunite?.Service?.name} />
                  <div className="card-body">
                    <h5 className="custom-name">{serviceOpportunite?.Service?.name}</h5>
                    <p>{serviceOpportunite?.Service?.description}</p>
                    <p>Type: {serviceOpportunite?.Service?.type}</p>
                    <p>Prix: {serviceOpportunite?.prix}</p>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
          <Button
            style={{ width: 50, height: 50, borderRadius: "50%" }}
            variant="primary"
            onClick={() => {
              setOpenChat(true);
            }}
          >
            <FontAwesomeIcon icon={faFacebookMessenger} />
          </Button>
          {openChat && (
            <div className="d-flex justify-content-end position-fixed w-100 ">
              <Chat
                opportunity={pack}
                setCloseChat={() => setOpenChat(false)}
                drawer={true}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}
