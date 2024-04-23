import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { DataGrid, GridToolbar, GridActionsCellItem } from "@mui/x-data-grid";
import { Button } from "@mui/material"; // Importez Button depuis @mui/material
import VisibilityIcon from "@mui/icons-material/Visibility";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff"; // Importez HighlightOffIcon depuis @mui/icons-material
import { fetchRendezvous,updateRendezvous } from "../../store/rendezvous";

function ListRendezvous() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const rendezvous = useSelector((state) => state.rendezvous.rendezvous.items);

  const handleAccept = (id) => {
    dispatch(updateRendezvous({ id, status: "accepté" }));
  };

  const handleReject = (id) => {
    dispatch(updateRendezvous({ id, status: "refusé" }));
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
      field: "actions",
      headerName: "Actions",
      width: 180,
      renderCell: ({ row }) => (
        <>
          <Button onClick={() => navigate(`/${row.id}`)}>
            <VisibilityIcon />
          </Button>
          <CheckCircleOutlineIcon onClick={() => handleAccept(row.id)} style={{ cursor: "pointer", color: "green" }} />
          <HighlightOffIcon onClick={() => handleReject(row.id)} style={{ cursor: "pointer", color: "red" }} />
        </>
      ),
    },
  ];

  useEffect(() => {
    dispatch(fetchRendezvous());
  }, [dispatch]);

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
