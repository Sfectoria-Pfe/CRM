import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOpportunites } from "../../../store/opportunite";
import { Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { DataGrid, GridToolbar, GridActionsCellItem } from "@mui/x-data-grid";
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddOpportunite from "./AddOpportunite"; // Importer le composant du formulaire d'ajout

function ListOpportunities() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const opportunities = useSelector(
    (state) => state?.opportunite.opportunites.items
  );
  const columns = [
    {
      field: "id",
      headerName: "Opportunity ID ",
      width: 150,
    },
    {
      field: "title",
      headerName: "Name ",
      width: 150,
    },
    {
      field: "equipeId",
      headerName: "Equipe Id",
      width: 150,
    },
    {
      field: "actions",
      type: "actions",
      width: 80,
      getActions: (row) => {
        return [
          <GridActionsCellItem
            disableFocusRipple={false}
            icon={<VisibilityIcon />}
            label="Look"
            size="small"
            edge="start"
            onClick={() => {
              navigate(`${row.id}`);
            }}
          />,
        ];
      },
    },
  ];

  useEffect(() => {
    dispatch(fetchOpportunites());
  }, [dispatch]);

  const [showModal, setShowModal] = useState(false);

  const handleAddOpportuniteSuccess = () => {
    setShowModal(false); // Ferme la modal après l'ajout réussi
  };

  return (
    <div>
      <div className="d-flex justify-content-center mb-3" style={{ backgroundColor: "#1976D2", color: "#fafafa" }}>
        <h2>Liste des Opportunités</h2>
      </div>
      <div className="d-flex justify-content-end mb-3">
        <Button variant="primary" onClick={() => setShowModal(true)}>
          Ajouter une opportunité
        </Button>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
      <br/><br/>  <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body>
          <AddOpportunite onSuccess={handleAddOpportuniteSuccess} /> {/* Afficher le formulaire d'ajout dans la modal */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Annuler
          </Button>
        </Modal.Footer>
      </Modal>

      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          columns={columns}
          rows={opportunities}
          slots={{ toolbar: GridToolbar }}
        />
      </div>
    </div>
  );
}

export default ListOpportunities;
