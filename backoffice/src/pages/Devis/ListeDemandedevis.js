import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Button, Tooltip } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { fetchDemandesDevis,updateDemandeDevisStatus } from "../../store/demandedevis";

function ListDemandeDevis() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const demandedevis = useSelector(
    (state) => state.demandedevis.demandesDevis.items
  );
  const handleAccept = (id) => {
    dispatch(updateDemandeDevisStatus({ id, newStatus: "Acceptée" })).then(() => {
      // Mettre à jour localement l'état de la demande
      const updatedDemandeDevis = demandedevis.map((demande) =>
        demande.id === id ? { ...demande, etat: "Acceptée" } : demande
      );
      // Mettre à jour l'état local
      // Ceci est optionnel et dépend de votre logique
      // setState(updatedDemandeDevis);
      window.location.reload();

    });
  };
  
  const handleReject = (id) => {
    dispatch(updateDemandeDevisStatus({ id, newStatus: "Refusée" })).then(() => {
      // Mettre à jour localement l'état de la demande
      const updatedDemandeDevis = demandedevis.map((demande) =>
        demande.id === id ? { ...demande, etat: "Refusée" } : demande
      );
      // Mettre à jour l'état local
      // Ceci est optionnel et dépend de votre logique
      // setState(updatedDemandeDevis);
      window.location.reload();

    });
  };
  const columns = [
    {
      field: "id",
      headerName: "ID de la demande",
      width: 150,
    },
    {
      field: "dateDemande",
      headerName: "dateDemande",
      width: 150,
    },
    {
      field: "description",
      headerName: "description",
      width: 150,
    },
    { field: "sujet", headerName: "sujet", width: 150 },
    { 
      field: "etat", 
      headerName: "etat", 
      width: 150,
      renderCell: ({ row }) => (
        <span style={{ color: row.etat === "Acceptée" ? 'green' : row.etat === "Refusée" ? 'red' : 'inherit' }}>
          {row.etat}
        </span>
      )
    },
    {
      field: "clientId",
      headerName: "ID de la client",
      width: 150,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 180,
      renderCell: ({ row }) => (
        <>
          <Button onClick={() => navigate(`/demande-devis/${row.id}`)}>
            <VisibilityIcon />
          </Button>
          <Tooltip title="Accepter demande" placement="top">
            <Button onClick={() => handleAccept(row.id)}>
              <CheckCircleIcon style={{ color: 'green' }} />
            </Button>
          </Tooltip>
          <Tooltip title="Refuser demande" placement="top">
            <Button onClick={() => handleReject(row.id)}>
              <CancelIcon style={{ color: 'red' }} />
            </Button>
          </Tooltip>
        </>
      ),
    },
  ];
  
  useEffect(() => {
    dispatch(fetchDemandesDevis());
  }, [dispatch]);

  return (
    <div>
      <div
        className="d-flex justify-content-center mb-3"
        style={{ backgroundColor: "#1976D2", color: "#fafafa" }}
      >
        <h2>Liste des Demandes devis</h2>
      </div>

      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          columns={columns}
          rows={demandedevis}
          slots={{ toolbar: GridToolbar }}
        />
      </div>
    </div>
  );
}

export default ListDemandeDevis;
