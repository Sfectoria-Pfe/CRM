import React from "react";
import Back from "../common/Back";
import RecentCard from "../home/recent/RecentCard";
import "../home/recent/recent.css";
import img from "../images/about.jpg";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { faFacebookMessenger } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Pack = () => {
  const [parcks, setPacks] = useState([]);

  useEffect(() => {
    const fetchPacks = async () => {
      try {
        const response = await axios.get("http://localhost:7000/opportunites", {
          params: {
            numberService: 2,
          },
        });
        setPacks(response.data);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchPacks();
  }, []);

  const packCards = () => {
    return parcks.map((opportunite) => (
      <Col key={opportunite.id} xs={12} sm={6} md={4} lg={3}>
        <Card style={{ marginBottom: "20px" }}>
          {/* <Card.Img
                variant="top"
                src={serviceOpportunite.Service.imageURL}
                /> */}
          <Card.Body>
            <Card.Title>{opportunite.title}</Card.Title>
            <Card.Text>
              Prix:{" "}
              {opportunite.service_Opportunites.reduce(
                (acc, elem) => elem.prix + acc,
                0
              )}
            </Card.Text>
            {opportunite.service_Opportunites.map((serviceOpportunite) => (
              <>
                <Card.Text>{serviceOpportunite.Service.name}</Card.Text>
                <Card.Text>{serviceOpportunite.Service.type}</Card.Text>
              </>
            ))}
          </Card.Body>
          <Card.Footer>
            <Button variant="primary">
              <FontAwesomeIcon icon={faFacebookMessenger} />
            </Button>
          </Card.Footer>
        </Card>
      </Col>
    ));
  };

  return (
    <>
      <section className="blog-out mb">
        <Back name="Pack" title="Notre pack" cover={img} />
        <div className="container recent">
          <Row>{packCards()}</Row>
          {/* <RecentCard /> */}
        </div>
      </section>
    </>
  );
};

export default Pack;
