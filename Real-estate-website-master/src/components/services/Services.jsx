import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux"; // Importer useSelector pour accéder à l'état du slice auth
import img from "../images/services.jpg";
import Back from "../common/Back";

export const Services = () => {
  const [services, setServices] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const me = useSelector((state) => state.auth.me); // Accéder à l'état de l'utilisateur connecté

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get("http://localhost:7000/opportunites", {
          params: {
            numberService: 1,
          },
        });
        setServices(response.data);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:7000/categorieclients");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchServices();
    fetchCategories();
  }, []);

  const ServiceCards = () => {
    return (
      <Row xs={1} sm={2} md={3}>
        {services.map((opportunite) =>
          opportunite.service_Opportunites.map((serviceOpportunite) => {
            // Vérifie si l'opportunité a des promotions et si l'utilisateur est connecté
            const hasPromotion = opportunite.promotion.length > 0 && me;

            // Vérifie si la catégorie sélectionnée a des promotions
            const categoryHasPromotion = hasPromotion && opportunite.promotion.some(promo => promo.CategorieClient.id === selectedCategory);

            // Si la catégorie n'a pas de promotion associée ou si l'utilisateur n'est pas connecté, ne pas afficher la carte
            if ((selectedCategory && !categoryHasPromotion) || (!me && hasPromotion)) {
              return null;
            }

            return (
              <Col
                key={serviceOpportunite?.serviceId}
                xs={12}
                sm={6}
                md={4}
                className="mb-4"
              >
                <Card className="custom-card-background">
                  <Card.Img
                    style={{
                      height:
                        "200px" /* Remplacez la valeur par la hauteur souhaitée */,
                      objectFit: "cover",
                    }}
                    variant="top"
                    src={serviceOpportunite?.Service?.imageURL}
                  />
                  <Card.Body>
                    <Card.Title className="custom-name">
                      {serviceOpportunite?.Service?.name}
                    </Card.Title>
                    <Card.Text>
                      {serviceOpportunite?.Service?.description}
                    </Card.Text>
                    <Card.Text>{serviceOpportunite?.Service?.type}</Card.Text>
                    <Card.Text>Prix: {serviceOpportunite?.prix}</Card.Text>
                    {hasPromotion && (
                      <div className={opportunite?.promotion?.length ? "animation" : ""} style={{ backgroundColor: 'green', color: '#ffffe6', fontSize: '25px' }}>
                      {opportunite?.promotion?.length ? <Card.Text style={{ color: '#ffffff' }}>promotion {opportunite?.promotion[0]?.pourcentage}%</Card.Text> : ''}
                    </div>
                    )}
                    
                  </Card.Body>
                  <Card.Footer>
                </Card.Footer>
              </Card>
                 <Link to={`/service/${opportunite.id}`}>
                    <Button variant="primary">Voire plus </Button>
                  </Link>
            </Col>
             
            );
          })
        )}
      </Row>
    );
  };

  return (
    <>
      <section className="services mb">
        <Back name="Services" title="Notre Service " cover={img} />
        <Container>
          <br />
          <br />
          <br />
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
            Notre Service
          </h1>
          {/* Ne pas afficher les boutons de catégorie */}
          {/* <Row>
            {categories.map((category) => (
              <Col key={category.id}>
                <Button onClick={() => setSelectedCategory(category.id)}>{category.nom}</Button>
              </Col>
            ))}
          </Row> */}
          <br />
          <br />
          {ServiceCards()}
          <br />
          <br />
        </Container>
      </section>
    </>
  );
};

export default Services;