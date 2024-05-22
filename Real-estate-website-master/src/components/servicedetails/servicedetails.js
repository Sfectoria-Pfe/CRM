import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchServices } from '../store/services';
import { Col, Card, Container, Row } from 'react-bootstrap';
import { FaMapMarkerAlt } from 'react-icons/fa';

function SevicedetailseCard({ id, image, nom, type, prix, adresse }) {
  return (
    <Col xs={12} sm={6} md={4} className="mb-4">
      <Card className="custom-card-background">
        <Card.Img style={{ width: "100%", height: "200px" }} src={image} />
        <Card.Body>
          <Card.Title>{nom}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{type}</Card.Subtitle>
          <div className="custom-price-container">
            <div className="custom-price-label">Prix</div>
            <div className="custom-price-value">{prix} DT</div>
          </div>
          <div className="custom-address">
            <FaMapMarkerAlt className="custom-address-icon" />
            <div className="custom-address-details">
              <div className="custom-address-label">Adresse</div>
              <div className="custom-address-text">{adresse}</div>
            </div>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
}

function ServicedetailsCard() {
  const dispatch = useDispatch();
  const { items: serviceDetails, isLoading } = useSelector((state) => state.services.services);

  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);

  return (
    <Container fluid>
      <Row xs={1} sm={2} md={3}>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          serviceDetails.map((serviceDetail) => (
            <SevicedetailseCard
              key={serviceDetail.id}
              id={serviceDetail.id}
              image={serviceDetail.imageURL}
              nom={serviceDetail.name}
              type={serviceDetail.type} // Afficher le type de service
              prix={serviceDetail.price}
              adresse={serviceDetail.address}
            />
          ))
        )}
      </Row>
    </Container>
  );
}

export default ServicedetailsCard;
