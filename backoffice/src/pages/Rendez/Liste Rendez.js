import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Button, Tooltip } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { fetchRendezvous, updateRendezvous } from "../../store/rendezvous";

function ListRendezvous() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const rendezvous = useSelector((state) => state.rendezvous.rendezvous.items);
  const [updatedRdvId, setUpdatedRdvId] = useState(null);
  const [updatedRdvStatut, setUpdatedRdvStatut] = useState(null);

  const handleAccept = (id) => {
    dispatch(updateRendezvous({ id, statut: "accepté" })).then(() => {
      setUpdatedRdvId(id);
      setUpdatedRdvStatut("accepté");
    });
  };

  const handleReject = (id) => {
    dispatch(updateRendezvous({ id, statut: "refusé" })).then(() => {
      setUpdatedRdvId(id);
      setUpdatedRdvStatut("refusé");
    });
  };

  useEffect(() => {
    dispatch(fetchRendezvous());
  }, [dispatch]); 

  useEffect(() => {
    if (updatedRdvId && updatedRdvStatut) {
      const updatedRendezvous = rendezvous.map((rdv) =>
        rdv.id === updatedRdvId ? { ...rdv, statut: updatedRdvStatut } : rdv
      );
      // Mettre à jour l'état local ici si nécessaire
    }
  }, [updatedRdvId, updatedRdvStatut, rendezvous]); 

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
              <CheckCircleIcon style={{ color: "green" }} />
            </Button>
          </Tooltip>
          <Tooltip title="Refusé" placement="top">
            <Button onClick={() => handleReject(row.id)}>
              <CancelIcon style={{ color: "red" }} />
            </Button>
          </Tooltip>
        </>
      ),
    },
  ];

  return (
    <div>
      <div className="d-flex justify-content-center mb-3" style={{ backgroundColor: "#1976D2", color: "#fafafa" }}>
        <h2>Liste des Demandes Rendez-vous</h2>
      </div>

      <br />
      <br />
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid columns={columns} rows={rendezvous} slots={{ toolbar: GridToolbar }} />
      </div>
    </div>
  );
}

export default ListRendezvous;
