import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchServices, deleteService } from "../../../store/services";
import { Link, useParams, useNavigate } from "react-router-dom"; // Import de useParams et useNavigate
import { DataGrid, GridToolbar, GridActionsCellItem } from "@mui/x-data-grid";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

import AddService from "./addService";
function ServiceListe() {
  const dispatch = useDispatch();
  const services = useSelector((state) => state.service.services.items);
  const navigate = useNavigate(); // Utilisation de useNavigate pour la navigation

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 150,
    },
    {
      field: "name",
      headerName: "Nom",
      width: 150,
    },
    {
      field: "description",
      headerName: "Description",
      width: 150,
    },
    {
      field: "type",
      headerName: "Type",
      width: 150,
    },
    {
      field: "price",
      headerName: "Prix",
      width: 150,
    },
    {
      field: "imageURL",
      headerName: "URL de l'image",
      width: 150,
      renderCell: (params) => (
        <img src={params.value} alt="Image" style={{ width: 50, height: 50 }} />
      ),
    },
    {
      field: "update",
      headerName: "Modifier",
      width: 120,
      renderCell: (params) => (
        <Link to={`/services/update/${params.row.id}`} key={params.row.id}>
          <GridActionsCellItem
            disableFocusRipple={false}
            icon={<EditIcon />}
            label="Modifier"
            size="small"
            edge="start"
          />
        </Link>
      ),
    },
    
   

    {
      field: "actions",
      type: "actions",
      width: 80,
      getActions: (row) => [
        <Link to={`/services/${row.id}`} key={row.id}>
          <GridActionsCellItem
            disableFocusRipple={false}
            icon={<VisibilityIcon />}
            label="Voir"
            size="small"
            edge="start"
          />
        </Link>,
      ],
    },
  ];

  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);

  
  return (
    <div>
      <div
        className="d-flex justify-content-center mb-3"
        style={{ backgroundColor: "#1976D2", color: "#fafafa" }}
      >
        <h2>Liste des Services</h2>
      </div>
      <div className="d-flex justify-content-end m-3" >
        < AddService/>
      </div>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          columns={columns}
          rows={services}
          slots={{ toolbar: GridToolbar }}
        />
      </div>
    </div>
  );
}

export default ServiceListe;
