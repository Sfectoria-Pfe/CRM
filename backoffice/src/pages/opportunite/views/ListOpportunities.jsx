import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOpportuniteAdmin, fetchOpportunites } from "../../../store/opportunite";
import { Button,Modal } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { DataGrid, GridToolbar, GridActionsCellItem } from "@mui/x-data-grid";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AddOpportunite from "./AddOpportunite"; // Import the AddOpportunite component

function ListOpportunities() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const opportunities = useSelector(
    (state) => state?.opportunite.opportunites.items
  );
  
  const [showModal, setShowModal] = useState(false);

  const me = useSelector((state) => state?.auth?.me);
  const columns = [
    {
      field: "id",
      headerName: "Opportunity ID",
      width: 150,
    },
    {
      field: "title",
      headerName: "Name",
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
   me?.Employee?.role ==="admin"? dispatch(fetchOpportuniteAdmin()): dispatch(fetchOpportunites(me?.employeeId));
  }, [dispatch]);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  console.log(me.id,'me');
  return (
    <div>
      <div className="d-flex justify-content-center mb-3" style={{ backgroundColor: "#1976D2", color: "#fafafa" }}>
        <h2>Liste des Opportunités</h2>
      </div>
      <div className="d-flex justify-content-end m-3">
        <Button variant="light" style={{backgroundColor:"#1976D2",color:"#ffffff"}} onClick={handleShowModal}>
          Ajouter opportunité
        </Button>
      </div>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          columns={columns}
          rows={opportunities}
          slots={{ toolbar: GridToolbar }}
        />
      </div>
      <Modal show={showModal} onHide={handleCloseModal} >
        <Modal.Header closeButton style={{padding:'30px'}}>
        </Modal.Header>
        <Modal.Body>
          <AddOpportunite onSuccess={handleCloseModal} />
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default ListOpportunities;
