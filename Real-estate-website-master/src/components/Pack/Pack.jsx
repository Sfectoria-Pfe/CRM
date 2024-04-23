import React from "react"
import Back from "../common/Back"
import RecentCard from "../home/recent/RecentCard"
import "../home/recent/recent.css"
import img from "../images/about.jpg"
import { useState } from "react"
import { useEffect } from "react"
import axios from "axios"
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { faFacebookMessenger } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Pack = () => {
const Services = ({ numberOfServices }) => { 
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get("http://localhost:7000/opportunites", {
          params: {
            numberService: numberOfServices 
          }
        });
        setServices(response.data);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchServices();
  }, [numberOfServices]);

  const ServiceCards = () => {
    return services.map((opportunite) => (
      <Row key={opportunite.id}>
        {opportunite.service_Opportunites.map((serviceOpportunite) => (
          <Col key={serviceOpportunite.serviceId} xs={12} sm={6} md={4} lg={3}>
            <Card style={{ marginBottom: "20px" }}>
              <Card.Img variant="top" src={serviceOpportunite.Service.imageURL} />
              <Card.Body>
                <Card.Title>{serviceOpportunite.Service.name}</Card.Title>
                <Card.Text>{serviceOpportunite.Service.description}</Card.Text>
                <Card.Text>{serviceOpportunite.Service.type}</Card.Text>
                <Card.Text>Prix: {serviceOpportunite.prix}</Card.Text>
                <Button variant="primary">
                <FontAwesomeIcon icon={faFacebookMessenger} />

           </Button>         
                   </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    ));
  };


  return (
    <>
      <section className='blog-out mb'>
        <Back name='Pack' title='Notre pack' cover={img} />
        <div className='container recent'>
        {ServiceCards()}

          <RecentCard />
        </div>
      </section>
    </>
  )
}
};
export default Pack;
