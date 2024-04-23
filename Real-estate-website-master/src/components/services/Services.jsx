import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import img from "../images/services.jpg";
import Back from "../common/Back";
import FeaturedCard from "../home/featured/FeaturedCard";
import LocationCard from "../home/location/locationcard";
import Recent from "../home/recent/Recent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookMessenger } from '@fortawesome/free-brands-svg-icons';

export const Services = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get("http://localhost:7000/opportunites", {
          params: {
            numberService: 1
          }
        });
        setServices(response.data);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchServices();
  }, []);

  const ServiceCards = () => {
    return (
      <>
        {services.map((opportunite) => (
          <Row key={opportunite.id}>
            {opportunite.service_Opportunites.map((serviceOpportunite) => (
              <Col key={serviceOpportunite?.serviceId} Col xs={12} sm={6} md={4} className="mb-4">
                <Card className="custom-card-background">
                  <Card.Img variant="top" src={serviceOpportunite?.Service?.imageURL} />
                  <Card.Body>
                    <Card.Title className="custom-name">{serviceOpportunite?.Service?.name}</Card.Title>
                    <Card.Text>{serviceOpportunite?.Service?.description}</Card.Text>
                    <Card.Text>{serviceOpportunite?.Service?.type}</Card.Text>
                    <Card.Text>Prix: {serviceOpportunite?.prix}</Card.Text>
                    <Button variant="primary" as={Link} to="/chat">
      <FontAwesomeIcon icon={faFacebookMessenger} />
    </Button>       
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        ))}
      </>
    );
  };

  return (
    <>
      <section className="services mb">
        <Back name="Services" title="Notre Service " cover={img} />
        <Container>
          <br /><br /><br /><br /><br />
          <h1
            className="section-title"
            style={{
              backgroundColor: "#00695c",
              color: "#ffffff",
              padding: "10px",
              borderRadius: "5px",
            }}
          >
            Notre Service
          </h1>
          {ServiceCards()}
          <br />
          <br />
          <h1
            className="section-title"
            style={{
              backgroundColor: "#00695c",
              color: "#ffffff",
              padding: "10px",
              borderRadius: "5px",
            }}
          >
            Notre immobilier pour la location
          </h1>
          <br></br> <br></br>
          <LocationCard />
          <br />
          <br />
          <h1
            className="section-title"
            style={{
              backgroundColor: "#00695c",
              color: "#ffffff",
              padding: "10px",
              borderRadius: "5px",
            }}
          >
            Notre immobilier pour la vente
          </h1>
          <Recent />
        </Container>
      </section>
    </>
  );
};

export default Services;
