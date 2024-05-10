import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Chat from "../chat/ChatBox";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaComments } from "react-icons/fa";

export default function ViewPack() {
  const { packId } = useParams();
  const [openChat, setOpenChat] = useState(false);
  const [pack, setPack] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPack = async () => {
      try {
        const response = await axios.get(
          `http://localhost:7000/opportunites/${packId}`
        );
        setPack(response.data);
      } catch (error) {
        console.error("Error fetching pack details:", error);
        setError(error);
      }
    };

    fetchPack();
  }, [packId]);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!pack) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ display: "flex" }}>
      {/* Première colonne pour afficher les informations */}
      <div style={{ flex: "1", paddingRight: "20px" }}>
        <div style={packInfoStyle}>
          <h6 style={packTitleStyle}>{pack.title}</h6>
         <h2> 
              
              {pack.service_Opportunites.reduce(
                (acc, elem) => elem.prix + acc,
                0
              )}{" "}
              DT    </h2>    </div>
  <br/><br/>
        <h3 style={servicesTitleStyle}>Les services :</h3>
        <ul style={servicesListStyle}>
          {pack.service_Opportunites &&
            pack.service_Opportunites.map((serviceOpportunite) => (
              <li key={serviceOpportunite.id} style={serviceItemStyle}>
                <div style={serviceDetailStyle}>
                  <h4>Titre:{serviceOpportunite.Service.name}</h4>
                  <p>Prix:{serviceOpportunite.Service.price} DT</p>
                  <p>Description:{serviceOpportunite.Service.description}</p>
                </div>
                <img
                  style={serviceImageStyle}
                  src={serviceOpportunite.Service.imageURL}
                  alt={serviceOpportunite.Service.name}
                />
              </li>
            ))}
        </ul>

        <Button
          style={chatButtonStyle}
          variant="primary"
          onClick={() => {
            setOpenChat(true);
          }}
        >
          <FaComments /> Chat
        </Button>
      </div>

      <div style={{ flex: "1", paddingLeft: "50px" }}>
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
    </div>
  );
}

const packInfoStyle = {
  textAlign: "center",
  border: "2px solid #007bff",
  borderRadius: "100px",
  backgroundColor: "#a5d6a7",

  padding: "20px",
};

const packTitleStyle = {
  fontSize: "32px",
  marginBottom: "10px",
  fontWeight: "bold",
  width: "100%", 
  padding: "10px", // Ajoute un remplissage intérieur pour donner de l'espace autour du texte
};
const serviceCardStyle = {
  backgroundColor: "#f4f4f4",
  borderRadius: "10px",
  padding: "20px",
  margin: "10px",
  flex: "1 0 calc(50% - 20px)", 
};

const packPriceStyle = {
  fontSize: "24px",
  fontWeight: "bold",
  color: "#007bff",
};

const servicesTitleStyle = {
  fontSize: "24px",
  marginBottom: "20px",
  color: "#007bff", // Couleur bleue
  textTransform: "uppercase", // Convertir le texte en majuscules
  fontWeight: "bold", // Texte en gras
};

const servicesListStyle = {
  listStyle: "none",
  padding: 0,
};



const serviceItemStyle = {
  display: "flex",
  alignItems: "center",
  marginBottom: "20px",
};

const serviceDetailStyle = {
  flex: "1",
};

const serviceImageStyle = {
  width: "150px",
  height: "140px",
  marginLeft: "20px",
};

const chatButtonStyle = {
  width: "100px",
  height: "50px",
  borderRadius: "50px",
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
  gap: "5px",
};
