import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPromotion } from "../../store/promotion";
import { Button, Modal } from "react-bootstrap";
import { DataGrid, GridToolbar, GridActionsCellItem } from "@mui/x-data-grid";
import VisibilityIcon from "@mui/icons-material/Visibility";

const styles = {
  clientDetails: {
    border: "1px solid #ccc",
    borderRadius: "5px",
    padding: "20px",
    marginTop: "10px",
  },
  detailItem: {
    marginBottom: "10px",
    fontSize: "20px",
  },
  strong: {
    fontWeight: "bold",
    marginRight: "5px",
  },
};

function ListPromotion() {
  const dispatch = useDispatch();
  const promotions = useSelector((state) => state.promotion.promotions.items);
  const [showModal, setShowModal] = useState(false);
  const [selectedPromotion, setSelectedPromotion] = useState(null);

  useEffect(() => {
    dispatch(fetchPromotion());
  }, [dispatch]);

  const handleViewClick = (promotion) => {
    setSelectedPromotion(promotion);
    setShowModal(true);
  };

  const columns = [
    { field: "id", headerName: "promotion ID", width: 150 },
    { field: "description", headerName: "description", width: 150 },
    { field: "pourcentage", headerName: "pourcentage", width: 150 },
    { field: "date_debut", headerName: "date_debut", width: 150 },
    { field: "opportuniteId", headerName: "opportuniteId", width: 150 },
    { field: "categorieClientId", headerName: "categorieClientId", width: 150 },
    {
      field: "actions",
      type: "actions",
      width: 80,
      getActions: (params) => [
        <GridActionsCellItem
          key="view"
          icon={<VisibilityIcon />}
          label="View"
          onClick={() => handleViewClick(params.row)}
        />,
      ],
    },
  ];

  return (
    <div>
      <div
        className="d-flex justify-content-center mb-3"
        style={{ backgroundColor: "#1976D2", color: "#fafafa" }}
      >
        <h2>Liste des Promotions</h2>
      </div>

      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          columns={columns}
          rows={promotions}
          slots={{ toolbar: GridToolbar }}
        />
      </div>

      {selectedPromotion && (
        <Modal show={showModal} onHide={() => setShowModal(false)} style={{padding:"50px"}}>
          <Modal.Header closeButton>
            <Modal.Title>Détails de la promotion</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ width: "500px" }}> {/* Adjusted width here */}
          <div style={{ height: "300px" }}>
            <h2 style={{ color: "#ffffff", fontSize: "30px" }}>Détails de la promotion</h2>
              <div style={styles.clientDetails}>
                <div style={styles.detailItem}>
                  <strong style={styles.strong}>Description:</strong> {selectedPromotion.description}
                </div>
                <div style={styles.detailItem}>
                  <strong style={styles.strong}>Pourcentage:</strong> {selectedPromotion.pourcentage}
                </div>
                <div style={styles.detailItem}>
                  <strong style={styles.strong}>Date de début:</strong> {selectedPromotion.date_debut}
                </div>
                
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>Fermer</Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
}

export default ListPromotion;