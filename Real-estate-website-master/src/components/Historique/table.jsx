import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import { fetchDemandesDevis } from "../store/demande";
import { Button } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";
import { updateClientId } from "../store/auth"; // Importez l'action pour mettre à jour l'ID du client

function ListDemandeDevis() {
  const dispatch = useDispatch();
  const clientId = useSelector((state) => state.auth.me?.clientId);
  const navigate = useNavigate();
    useEffect(() => {
    dispatch(fetchDemandesDevis());
  }, [dispatch]);
  const allDemandeDevis = useSelector((state) => state.demande.demandesDevis.items);

// Filtrer les devis du client connecté
const demandedevis = allDemandeDevis.filter((demande) => demande.clientId === clientId);
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
      field: "actions",
      headerName: "Actions",
      width: 180,
      renderCell: ({ row }) => (
        <>
          <Button onClick={() => navigate(`/demande-devis/${row.id}`)}>
            <VisibilityIcon />
          </Button>
        </>
      ),
    },
  ];

  return (
    <div>
      <div
        className="d-flex justify-content-center mb-3"
        style={{ backgroundColor: "#66bb6a", color: "#fafafa", padding: "10px", borderRadius: "5px", width: "50%", margin: "0 auto" }}
      >
        <h2>Liste des Demandes devis</h2>
      </div>

      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          columns={columns}
          rows={demandedevis}
        />
      </div>
    </div>
  );
}

export default ListDemandeDevis;
