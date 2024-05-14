import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Button, Tooltip } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { fetchRendezvous, updateRendezStatus } from "../../store/rendezvous";

function ListRendezvous() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const rendezvous = useSelector((state) => state.rendezvous.rendezvous.items);

  useEffect(() => {
    dispatch(fetchRendezvous());
  }, [dispatch]);

  const handleAccept = (id) => {
    dispatch(updateRendezStatus({ id, newStatus: "Accepté" }));
  };

  const handleReject = (id) => {
    dispatch(updateRendezStatus({ id, newStatus: "Refusé" }));
  };

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
      renderCell: ({ row }) => (
        <span style={{ color: row.statut === "Accepté" ? 'green' : row.statut === "Refusé" ? 'red' : 'inherit' }}>
          {row.statut}
        </span>
      )
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
          <Tooltip title="Accepté" placement="top"stycolor="green">
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
      {/* Liste des rendez-vous */}
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
