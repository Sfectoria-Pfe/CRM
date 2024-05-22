import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEquipesCommerciales } from "../../store/Equipe";
import { Link } from "react-router-dom";
import { DataGrid, GridToolbar, GridActionsCellItem } from "@mui/x-data-grid";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

function ListEquipeCommerciale() {
  const dispatch = useDispatch();
  const equipesCommerciales = useSelector(
    (state) => state.Equipe.equipesCommerciales.items
  );

  const [selectedEquipe, setSelectedEquipe] = useState(null);
  const [open, setOpen] = useState(false);

  const handleViewDetails = (equipe) => {
    setSelectedEquipe(equipe.row);
    setOpen(true);
  };

  const handleClose = () => {
    setSelectedEquipe(null);
    setOpen(false);
  };

  const columns = [
    {
      field: "id",
      headerName: "ID de l'équipe commerciale",
      width: 200,
    },
    {
      field: "nom_equipe",
      headerName: "Nom de l'équipe commerciale",
      width: 200,
    },
    {
      field: "actions",
      type: "actions",
      width: 80,
      getActions: (row) => [
        <GridActionsCellItem
          key={row.id}
          disableFocusRipple={false}
          icon={<VisibilityIcon />}
          label="Voir"
          size="small"
          edge="start"
          onClick={() => handleViewDetails(row)}
        />,
      ],
    },
  ];

  useEffect(() => {
    dispatch(fetchEquipesCommerciales());
  }, [dispatch]);

  return (
    <div>
      <div
          className="d-flex justify-content-center mb-3"
          style={{ backgroundColor: "#1976D2", color: "#fafafa",width:"100%" }}
        >
          <h2>Liste des equipes Commerciales</h2>
        </div>
      <div className="d-flex justify-content-end m-3">
        <Link  to="/AddEquipeCommerciale">
          <Button style={{backgroundColor:"#1976D2",color:"#ffffff"}}>Ajouter une équipe commerciale </Button>
        </Link>
        
      </div>

      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          columns={columns}
          rows={equipesCommerciales}
          slots={{ toolbar: GridToolbar }}
        />
      </div>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Détails de l'équipe commerciale</DialogTitle>
        <DialogContent>
          {selectedEquipe && (
            <div>
              <p>ID: {selectedEquipe.id}</p>
              <p>Nom: {selectedEquipe.nom_equipe}</p>
              {/* Ajoutez d'autres propriétés de l'équipe commerciale ici */}
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Fermer
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ListEquipeCommerciale;
