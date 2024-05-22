import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Button, TextField, Grid, Paper, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import {
  fetchCategories,
  deleteCategory,
  sendCategory,
} from "../../store/categorieClient";

function ListCategoryClients() {
  const dispatch = useDispatch();
  const categories = useSelector(
    (state) => state.categorieClient.categories.items
  );

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteCategory(id));
  };

  const [nom, setNom] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(sendCategory({ nom, description }))
      .then(() => {
        // Réinitialiser les champs après l'envoi réussi
        setNom("");
        setDescription("");
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 100,
    },
    {
      field: "nom",
      headerName: "Nom",
      width: 200,
    },
    {
      field: "description",
      headerName: "Description",
      width: 400,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 180,
      renderCell: ({ row }) => (
        <>
          
          <Button
            onClick={() => handleDelete(row.id)}
            startIcon={<DeleteIcon />}
            color="error"
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h4" gutterBottom>
          Ajouter une Catégorie
        </Typography>
        <Paper elevation={3} style={{ padding: "20px" }}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Nom"
                  variant="outlined"
                  fullWidth
                  value={nom}
                  onChange={(e) => setNom(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Description"
                  variant="outlined"
                  fullWidth
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Grid>
            </Grid>
            {error && (
              <Typography variant="body2" color="error">
                {error}
              </Typography>
            )}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{ marginTop: "10px" }}
            >
              Ajouter
            </Button>
          </form>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h4" gutterBottom>
          Liste des Catégories de Clients
        </Typography>
        <Paper elevation={3}>
          <DataGrid
            columns={columns}
            rows={categories}
            slots={{ toolbar: GridToolbar }}
          />
        </Paper>
      </Grid>
    </Grid>
  );
}

export default ListCategoryClients;
