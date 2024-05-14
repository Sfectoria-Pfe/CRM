import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchClient } from "../../../store/client";
import { useParams } from "react-router-dom";

export default function OneClient() {
  const dispatch = useDispatch();
  const { clientId } = useParams();
  const client = useSelector((state) => state.client.client);

  useEffect(() => {
    dispatch(fetchClient(clientId)); 
  }, [dispatch, clientId]);

  const styles = {
    clientDetails: {
      border: "1px solid #ccc",
      borderRadius: "5px",
      padding: "20px",
      marginTop: "10px",
    },
    detailItem: {
      marginBottom: "10px",
    },
    strong: {
      fontWeight: "bold",
      marginRight: "5px",
    },
  };

  return (
    <div     
    >
      <h2 style={ {color:"#1976D2"}}
>Client Details</h2>
      <div style={styles.clientDetails}>
        <div style={styles.detailItem}>
          <strong style={styles.strong}>Nom:</strong> {client?.nom}
        </div>
        <div style={styles.detailItem}>
          <strong style={styles.strong}>Prénom:</strong> {client?.prenom}
        </div>
        <div style={styles.detailItem}>
          <strong style={styles.strong}>Email:</strong> {client?.email}
        </div>
        <div style={styles.detailItem}>
          <strong style={styles.strong}>Adresse:</strong> {client?.adresse}
        </div>
        <div style={styles.detailItem}>
          <strong style={styles.strong}>Téléphone:</strong> {client?.telephone}
        </div>
      </div>
      {client?.stages.map((elem,i)=><div>
        oppotynity : {elem.Stage.Opportunite.title}
        stage : {elem.Stage.nom}
        stage : {elem.description}
      </div>)}
    </div>
  );
}
