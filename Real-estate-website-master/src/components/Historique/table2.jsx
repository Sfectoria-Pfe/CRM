import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Button, Tooltip } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';


function ListHistorique2() {
  const dispatch = useDispatch();

  // Define the columns for the table
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
        <span style={{ color: 'inherit' }}>
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
    // Fetch demande devis data here if needed
    // dispatch(fetchDemandesDevis());
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
          rows={[]}
        //   slots={{ toolbar: GridToolbar }}
        />
      </div>
    </div>
  );
}

export default ListHistorique2;