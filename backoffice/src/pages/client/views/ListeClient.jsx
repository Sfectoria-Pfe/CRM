import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchClients, updateClient } from "../../../store/client";
import { fetchCategories } from "../../../store/categorieClient";
import { Button, MenuItem, Select } from "@mui/material";
import { DataGrid, GridToolbar, GridActionsCellItem } from "@mui/x-data-grid";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import { Link, useNavigate } from "react-router-dom";
function ListClients() {
  const dispatch = useDispatch();
  const clients = useSelector((state) => state.client.clients.items);
  const categories = useSelector(
    (state) => state.categorieClient.categories.items
  );

  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedClientId, setEditedClientId] = useState(null);

  const navigate = useNavigate();
  const handleCategoryChange = (event) => {
    setSelectedCategoryId(event.target.value);
  };

  const handleEditClick = (clientId) => {
    setIsEditing(true);
    setEditedClientId(clientId);
  };

  const handleSaveClick = () => {
    // Envoyer la mise à jour de la catégorie au backend
    dispatch(
      updateClient({
        id: editedClientId,
        body: { categorieId: selectedCategoryId },
      })
    );
    setIsEditing(false);
  };

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
      field: "categorieId",
      headerName: "Catégorie",
      width: 150,
      renderCell: (params) =>
        isEditing && params.row.id === editedClientId ? (
          <Select value={selectedCategoryId} onChange={handleCategoryChange}>
            {categories.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.nom}
              </MenuItem>
            ))}
          </Select>
        ) : (
          categories.find((category) => category.id === params.row.categorieId)
            ?.nom
        ),
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
        if (isEditing && row.id === editedClientId) {
          return [
            <Button
              key="save"
              variant="contained"
              color="primary"
              size="small"
              onClick={handleSaveClick}
            >
              Save
            </Button>,
          ];
        } else {
          return [
            <Link to={`${row.id}`} key={row.id}>
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
            <Button
              key="edit"
              variant="contained"
              color="primary"
              size="small"
              startIcon={<EditIcon />}
              onClick={() => handleEditClick(row.id)}
            >
              {isEditing && editedClientId === row.id ? "Cancel" : "Edit"}
            </Button>,
          ];
        }
      },
    },
  ];

  useEffect(() => {
    dispatch(fetchClients());
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <div>
      <div
        className="d-flex justify-content-center mb-3"
        style={{ backgroundColor: "#1976D2", color: "#fafafa" }}
      >
        <h2>Liste des clients</h2>
      </div>
      <div className="d-flex justify-content-end m-3">
        {/* Ajout du lien vers la page d'ajout de client */}
        <Link className="btn btn-light" style={{ backgroundColor: "#81d4fa" }} to="addClient">
          Ajouter client
        </Link>
      </div>
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
