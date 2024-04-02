import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Col, Card, Button, Container, Row } from 'react-bootstrap';
import { FaMapMarkerAlt } from 'react-icons/fa'; // Importez l'icône souhaitée depuis Font Awesome
// import './RecentCard.css'; // Importez le fichier CSS pour les styles personnalisés

function VenteCard(props) {
  return (
    <Col xs={12} sm={6} md={4} className="mb-4">
      <Card className="custom-card-background">
        <div className="custom-card-background"></div> {/* Ajoutez cet élément pour l'arrière-plan */}
        <Card.Img  style={{width:"350px",height:"200px"}}
          
          src={props.image} 
           // Ajoutez la classe CSS pour l'image
        />
        <Card.Body>
          <Card.Title className="custom-name">{props.nom}</Card.Title>
          <div className="custom-price-container">
            <div className="custom-price-label">Prix</div>
            <div className="custom-price-value">{props.prix} DT</div>
          </div>
          <div className="custom-address">
            <FaMapMarkerAlt className="custom-address-icon" /> {/* Icône de l'adresse */}
            <div className="custom-address-details">
              <div className="custom-address-label">Adresse</div> {/* Libellé de l'adresse */}
              <div className="custom-address-text">{props.adresse}</div> {/* Texte de l'adresse */}
            </div>
            </div>
          <Button as={Link} to={`/vente/${props.id}`} className="custom-button">Voir plus</Button>
        </Card.Body>
      </Card>
    </Col>
  );
}

function RecentCard() {
  const [ventes, setVentes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchVentes();
  }, []);

  const fetchVentes = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("http://localhost:7000/ventes");
      setVentes(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching ventes:", error);
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
            ventes.map((vente) => (
              <VenteCard
                key={vente.id}
                id={vente.id}
                image={vente.image}
                nom={vente.nom}
                prix={vente.prix}
                adresse={vente.lieu}
              />
            ))
          )}
        </Row>
      </Container>
    </div>
  );
}

export default RecentCard;
