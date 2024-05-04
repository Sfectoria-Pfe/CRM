import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchService } from "../../../store/services";
import { Link, useParams } from "react-router-dom";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export default function OneService() {
  const dispatch = useDispatch();
  const { serviceId } = useParams();
  const service = useSelector((state) => state.service.service);
  const serviceDetails = useSelector(
    (state) => state.serviceDetails.serviceDetails.items
  );

  useEffect(() => {
    dispatch(fetchService(serviceId));
  }, [dispatch, serviceId]);

  const filteredServiceDetails = serviceDetails.filter(
    (detail) => detail.serviceId === parseInt(serviceId)
  );

  const cardStyle = {
    minWidth: 275,
    margin: "10px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  };

  const imageStyle = {
    width: "100%",
    height: "150px",
    objectFit: "cover",
  };

  return (
    <div style={{ padding: "20px", backgroundColor: "#f9f9f9", borderRadius: "10px", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" }}>
      <h2 style={{ color: "#1976D2", marginBottom: "20px", borderBottom: "2px solid #1976D2", paddingBottom: "10px" }}>Détails du Service</h2>
      <div style={{ marginBottom: "20px" }}>
        <Typography variant="h5" style={{ color: "#333", marginBottom: "10px" }}>
          Nom: <span style={{ fontWeight: "bold" }}>{service?.name}</span>
        </Typography>
        <Typography variant="h5" style={{ color: "#333", marginBottom: "10px" }}>
          Type: <span style={{ fontWeight: "bold" }}>{service?.type}</span>
        </Typography>
        <Typography variant="h5" style={{ color: "#333", marginBottom: "10px" }}>
          Prix: <span style={{ fontWeight: "bold" }}>{service?.price}</span>
        </Typography>
        <Typography variant="h5" style={{ color: "#333" }}>
          Description:
        </Typography>
        <Typography variant="body1" style={{ paddingLeft: "20px", color: "#555" }}>
          {service?.description}
        </Typography>
      </div>
      <Link to={`/servicesdetails/addservicedetails`} style={{ textDecoration: "none" }}>
        <Button variant="contained" color="primary" style={{ marginBottom: "20px" }}>
          Ajouter Détail du Service
        </Button>
      </Link>
      <h3 style={{ color: "#1976D2", marginBottom: "10px" }}>Détails des Services Associés</h3>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {filteredServiceDetails.map((detail) => (
          <Card key={detail.id} style={cardStyle}>
            <CardContent>
              <img src={detail.imageURL} alt="Image Service" style={imageStyle} />
              <Typography variant="h5" style={{ color: "#333", marginBottom: "10px" }}>
                {detail.title}
              </Typography>
              <Typography variant="body1" style={{ color: "#555" }}>
                {detail.description}
              </Typography>
              <Typography variant="body2" style={{ color: "#888" }}>
                Adresse: {detail.address}
              </Typography>
              <Typography variant="body2" style={{ color: "#888" }}>
                Prix: {detail.price}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
