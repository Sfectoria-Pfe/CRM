import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import { fetchRendezvous } from "../store/Rendez-vous";
import { Button, Tooltip } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

function ListHistorique2() {
  const dispatch = useDispatch();
  const rendezvousList = useSelector(state => state.RendezVous.rendezvous.items); // Obtenez la liste des rendez-vous à partir du state
  const clientId = useSelector(state => state.auth.me?.clientId); // Obtenez l'ID du client connecté à partir du state

  // Filtrer les rendez-vous par ID du client
  const rendezvousClient = rendezvousList.filter(rendezvous => rendezvous.clientId === clientId);

  // Define the columns for the table
  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 100,
    },
    {
      field: "date",
      headerName: "Date",
      width: 150,
    },
    {
      field: "heure",
      headerName: "Heure",
      width: 150,
    },
    {
      field: "typebien",
      headerName: "Type de bien",
      width: 150,
    },
    {
      field: "localisation",
      headerName: "Localisation",
      width: 200,
    },
    {
      field: "description",
      headerName: "Description",
      width: 200,
    },
    {
      field: "statut",
      headerName: "Statut",
      width: 150,
    },
    
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: () => (
        <>
          <Button disabled>
            <VisibilityIcon />
          </Button>
          <Tooltip title="Accepter demande" placement="top">
            <Button disabled>
              <CheckCircleIcon style={{ color: 'green' }} />
            </Button>
          </Tooltip>
          <Tooltip title="Refuser demande" placement="top">
            <Button disabled>
              <CancelIcon style={{ color: 'red' }} />
            </Button>
          </Tooltip>
        </>
      ),
    },
  ];

  useEffect(() => {
    // Fetch rendezvous data
    dispatch(fetchRendezvous());
  }, [dispatch]);

  return (
    <div>
     <div
        className="d-flex justify-content-center mb-3"
        style={{ backgroundColor: "#66bb6a", color: "#fafafa", padding: "10px", borderRadius: "5px", width: "50%", margin: "0 auto" }}
      >
        <h2>Liste des Demandes Rendez-vous</h2>
      </div>

      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          columns={columns}
          rows={rendezvousClient} // Utilisez les données filtrées des rendez-vous ici
        />
      </div>
    </div>
  );
}

export default ListHistorique2;
