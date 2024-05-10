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
import { Link } from "react-router-dom";
import { faDollarSign, faCheck } from "@fortawesome/free-solid-svg-icons"; // Importez les icônes nécessaires
import "../Pack/promot.css";
const Pack = () => {
  const [packs, setPacks] = useState([]);

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
    return packs.map((opportunite) => (
      <Col key={opportunite.id} xs={12} sm={6} md={4} className="mb-4">
        <Card
          style={{
            backgroundColor: "white",
            minWidth: "350px",
            maxWidth: "600px",
            height: "auto",
            borderRadius: "14px",
            boxShadow: "0px 10px 30px hsl(185, 75%, 35%)",
          }}
        >
          <Card.Header
            style={{
              backgroundColor: "#b2dfdb",
              backgroundPosition: "0px 0px",
              backgroundRepeat: "no-repeat",
              backgroundSize: "contain",
              textAlign: "center",
              borderTopLeftRadius: "14px",
              borderTopRightRadius: "14px",
            }}
          >
            {" "}
            <Card.Title>
              <h5 style={{ color: "#1a237e" }}>Profitez Notre pack:</h5>
              <h2>{opportunite.title}</h2>
            </Card.Title>
            <Card.Title>
              <FontAwesomeIcon
                icon={faDollarSign}
                style={{ color: "#1a237e" }}
              />{" "}
              Prix:{" "}
              {opportunite.service_Opportunites.reduce(
                (acc, elem) => elem.prix + acc,
                0
              )}{" "}
              DT
            </Card.Title>
            <br />
          </Card.Header>
          {/* <Card.Img
                variant="top"
                src={serviceOpportunite.Service.imageURL}
                /> */}
          <Card.Body>
            <h3 style={{ color: "#1a237e" }}> Les services :</h3>
            {opportunite.service_Opportunites.map((serviceOpportunite) => (
              <>
                <Card.Title style={{ color: "black" }}>
                  <FontAwesomeIcon
                    icon={faCheck}
                    style={{ color: "green", fontSize: "20px" }}
                  />{" "}
                  {/* Ajouter l'icône de coche */}
                  {serviceOpportunite.Service.name}
                </Card.Title>
              </>
            ))}
<div className={opportunite?.promotion?.length ? "animation" : ""} style={{ backgroundColor: 'green', color: '#ffffe6', fontSize: '25px' }}>
  {opportunite?.promotion?.length ? <Card.Text style={{ color: '#ffffff' }}>promotion {opportunite?.promotion[0]?.pourcentage}%</Card.Text> : ''}
</div>          </Card.Body>
          <Card.Footer>
            <Link to={`/pack/${opportunite.id}`}>
              <Button variant="primary">Voire plus </Button>
            </Link>
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
          <Row style={{ display: "flex" }}>{packCards()}</Row>
        </div>
      </section>
    </>
  );
};

export default Pack;
