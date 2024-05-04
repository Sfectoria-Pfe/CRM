import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Button, Tooltip } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel"; // Modification ici
import { fetchRendezvous} from "../../store/rendezvous";
import { updateRendezvous } from "../../store/rendezvous";

function ListRendezvous() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const rendezvous = useSelector((state) => state.rendezvous.rendezvous.items);

  const handleAccept = (id) => {
    dispatch(updateRendezvous({ id, statut: "accepté" })).then(() => {
      // Mettre à jour localement l'état du rendez-vous
      const updatedRendezvous = rendezvous.map((rdv) =>
        rdv.id === id ? { ...rdv, statut: "accepté" } : rdv
      );
      // Mettre à jour l'état local
      // Cela dépend de votre logique et de la gestion de l'état dans votre application
      // setState(updatedRendezvous);

      // Recharger la page pour refléter les mises à jour
      window.location.reload();
    });
  };

  const handleReject = (id) => {
    dispatch(updateRendezvous({ id, statut: "refusé" })).then(() => {
      // Mettre à jour localement l'état du rendez-vous
      const updatedRendezvous = rendezvous.map((rdv) =>
        rdv.id === id ? { ...rdv, statut: "refusé" } : rdv
      );
      // Mettre à jour l'état local
      // Cela dépend de votre logique et de la gestion de l'état dans votre application
      // setState(updatedRendezvous);

      // Recharger la page pour refléter les mises à jour
      window.location.reload();
    });
  };


  useEffect(() => {
    dispatch(fetchRendezvous());
  }, [dispatch])
  const columns = [
    {
      field: "id",
      headerName: "Rendez-vous ID",
      width: 150,
    },
    {
      field: "typebien",
      headerName: "Type de bien",
      width: 150,
    },
    {
      field: "heure",
      headerName: "Heure",
      width: 150,
    },

    {
      field: "date",
      headerName: "Date",
      width: 150,
    },
    {
      field: "localisation",
      headerName: "Localisation",
      width: 150,
    },
    {
      field: "clientId",
      headerName: "Client",
      width: 150,
    },

    {
      field: "statut",
      headerName: "Statut",
      width: 150,
    },

    {
      field: "actions",
      headerName: "Actions",
      width: 180,
      renderCell: ({ row }) => (
        <>
          <Button onClick={() => navigate(`/${row.id}`)}>
            <VisibilityIcon />
          </Button>
          <Tooltip title="Accepté" placement="top">
            <Button onClick={() => handleAccept(row.id)}>
              <CheckCircleIcon style={{ color: 'green' }} />
            </Button>
          </Tooltip>
          <Tooltip title="Refusé" placement="top">
            <Button onClick={() => handleReject(row.id)}>
              <CancelIcon style={{ color: 'red' }} />
            </Button>
          </Tooltip>
        </>
      ),
    },
  ];

  return (
    <div>
      <div className="d-flex justify-content-center mb-3" style={{backgroundColor:"#1976D2",color:"#fafafa"}}>
        <h2>Liste des Demandes Rendez-vous</h2>
      </div>  

 <br/><br/>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          columns={columns}
          rows={rendezvous}
          slots={{ toolbar: GridToolbar }}
        />
      </div>
    </div>
  );
}

export default ListRendezvous;
