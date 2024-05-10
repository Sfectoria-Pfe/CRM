import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Col, Card, Button, Container, Row } from 'react-bootstrap';
import { FaMapMarkerAlt } from 'react-icons/fa';

function SevicedetailseCard(props) {
  return (
    <Col xs={12} sm={6} md={4} className="mb-4">
      <Card className="custom-card-background">
        <Card.Img style={{width:"470px",height:"200px"}} src={props.image} />
        <Card.Body>
          <Card.Title>{props.nom}</Card.Title>
          <Card.Title>{props.title}</Card.Title>

          <div className="custom-price-container">
            <div className="custom-price-label">Prix</div>
            <div className="custom-price-value">{props.prix} DT</div>
          </div>
          <div className="custom-address">
            <FaMapMarkerAlt className="custom-address-icon" />
            <div className="custom-address-details">
              <div className="custom-address-label">Adresse</div>
              <div className="custom-address-text">{props.adresse}</div>
            </div>
          </div>
          <Button as={Link} to={`/location/${props.id}`} className="custom-button">Voir plus</Button>
        </Card.Body>
      </Card>
    </Col>
  );
}

function ServicedetailsCard() {
  const [ServiceDetails, setServiceDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("http://localhost:7000/service-details");
      setServiceDetails(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching service details:", error);
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Container fluid>
        <Row xs={1} sm={2} md={3}>
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            ServiceDetails.map((serviceDetail) => (
              <SevicedetailseCard
                key={serviceDetail.id}
                id={serviceDetail.id}
                image={serviceDetail.imageURL}
                nom={serviceDetail.title}
                prix={serviceDetail.price}
                adresse={serviceDetail.address}

              />
            ))
          )}
        </Row>
      </Container>
    </div>
  );
}

export default ServicedetailsCard;
