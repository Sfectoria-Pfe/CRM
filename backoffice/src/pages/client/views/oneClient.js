import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchClient } from "../../../store/client";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faMapMarkerAlt, faPhone } from "@fortawesome/free-solid-svg-icons";

export default function OneClient() {
  const dispatch = useDispatch();
  const { clientId } = useParams();
  const client = useSelector((state) => state.client.client);

  useEffect(() => {
    dispatch(fetchClient(clientId)); 
  }, [dispatch, clientId]);

  const styles = {
    container: {
      padding: "20px",
    },
    section: {
      marginBottom: "20px",
    },
    heading: {
      color: "#1976D2",
      fontSize: "24px",
      marginBottom: "10px",
    },
    detailItem: {
      marginBottom: "10px",
      display: "flex",
      alignItems: "center",
    },
    icon: {
      marginRight: "10px",
      fontSize: "20px",
      color: "#1976D2",
    },
    strong: {
      fontWeight: "bold",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      marginTop: "20px",
    },
    th: {
      backgroundColor: "#f2f2f2",
      padding: "8px",
      textAlign: "left",
    },
    td: {
      padding: "8px",
      borderBottom: "1px solid #ddd",
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Détails du client</h2>
      <div style={styles.section}>
        <div style={styles.detailItem}>
          <FontAwesomeIcon icon={faEnvelope} style={styles.icon} />
          <span style={styles.strong}>Email:</span> {client?.email}
        </div>
        <div style={styles.detailItem}>
          <FontAwesomeIcon icon={faMapMarkerAlt} style={styles.icon} />
          <span style={styles.strong}>Adresse:</span> {client?.adresse}
        </div>
        <div style={styles.detailItem}>
          <FontAwesomeIcon icon={faPhone} style={styles.icon} />
          <span style={styles.strong}>Téléphone:</span> {client?.telephone}
        </div>
      </div>
      <div style={styles.section}>
        <h3 style={styles.heading}>Historique des stages du client</h3>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Opportunité</th>
              <th style={styles.th}>Nom du stage</th>
              <th style={styles.th}>Description du stage</th>
              <th style={styles.th}>Date du stage</th>
              <th style={styles.th}>Commentaire</th>
              <th style={styles.th}>Date du commentaire</th>
            </tr>
          </thead>
          <tbody>
            {client?.stages.map((elem, i) => (
              <tr key={i}>
                <td style={styles.td}>{elem.Stage.Opportunite.title}</td>
                <td style={styles.td}>{elem.Stage.nom}</td>
                <td style={styles.td}>{elem.description}</td>
                <td style={styles.td}>{new Date(elem.Stage.createdAt).toLocaleDateString()}</td>
                <td style={styles.td}>
                  {elem.Comment.length > 0 ? (
                    <ul style={{ padding: 0, margin: 0, listStyle: "none" }}>
                      {elem.Comment.map((comment, index) => (
                        <li key={index} style={{ marginBottom: "5px" }}>
                          {comment.content}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    "Aucun commentaire"
                  )}
                </td>
                <td style={styles.td}>
                  {elem.Comment.length > 0 ? (
                    <ul style={{ padding: 0, margin: 0, listStyle: "none" }}>
                      {elem.Comment.map((comment, index) => (
                        <li key={index} style={{ marginBottom: "5px" }}>
                          {new Date(comment.createdAt).toLocaleDateString()}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    ""
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
