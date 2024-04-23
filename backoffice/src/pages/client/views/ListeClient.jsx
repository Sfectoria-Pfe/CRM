import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchClients } from "../../../store/client";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { DataGrid, GridToolbar, GridActionsCellItem } from "@mui/x-data-grid";
import { useDemoData } from "@mui/x-data-grid-generator";
import VisibilityIcon from "@mui/icons-material/Visibility";
import OneClient from "./oneClient";
function ListClients() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const clients = useSelector((state) => state.client.clients.items);

  const columns = [
    {
      field: "id",
      headerName: "Client ID ",
      width: 150,
    },
    {
      field: "nom",
      headerName: "Name ",
      width: 150,
    },
    {
      field: "prenom",
      headerName: "Prenom",
      width: 150,
    },
    {
      field: "email",
      headerName: "Email",
      width: 150,
    },
    {
      field: "adresse",
      headerName: "Adress",
      width: 150,
    },
    {
      field: "telephone",
      headerName: "Telephone",
      width: 150,
    },
    {
      field: "image",
      headerName: "Image",
      width: 150,
      renderCell: (params) => (
        <img
          src={params.value}
          alt="Client"
          style={{ width: 50, height: 50 }}
        />
      ),
    },
    {
      field: "actions",
      type: "actions",
      width: 80,
      getActions: (row) => {
        return [
<Link to={`${row.id}`} key={row.id}>
            {" "}
            <GridActionsCellItem
              disableFocusRipple={false}
              icon={<VisibilityIcon />}
              label="Look"
              size="small"
              edge="start"
              onClick={() => {
                navigate(`/clients/${row.id}`);
              }}
            />
          </Link>,
        ];
      },
    },
  ];

  const VISIBLE_FIELDS = [
    "name",
    "rating",
    "country",
    "dateCreated",
    "isAdmin",
  ];

  useEffect(() => {
    dispatch(fetchClients());
  }, [dispatch]);

  return (
    <div>
<div className="d-flex justify-content-center mb-3" style={{backgroundColor:"#1976D2",color:"#fafafa"}}>
        <h2>Liste des clients</h2>
      </div>     <br/><br/><br/>

      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          columns={columns}
          rows={clients}
          slots={{ toolbar: GridToolbar }}
        />
      </div>
    </div>
  );
}

export default ListClients;
