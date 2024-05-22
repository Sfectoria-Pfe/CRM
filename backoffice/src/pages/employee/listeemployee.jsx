import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployees,fetchEmployee } from "../../store/employee";
import { Link, useNavigate } from "react-router-dom";
import { DataGrid, GridToolbar, GridActionsCellItem } from "@mui/x-data-grid";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

function ListEmployee() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const employees = useSelector((state) => state.employee.employees.items);

  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [open, setOpen] = useState(false);

  const handleViewDetails = (employee) => {
    console.log("Employé sélectionné :", employee); // Vérifiez les détails de l'employé transmis
    setSelectedEmployee(employee.row);
    setOpen(true);
  };

  const handleClose = () => {
    setSelectedEmployee(null); // Réinitialiser l'employé sélectionné lors de la fermeture
    setOpen(false);
  };

  const columns = [
    {
      field: "id",
      headerName: "Employee ID",
      width: 150,
    },
    {
      field: "nom",
      headerName: "Nom",
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
      headerName: "Adresse",
      width: 150,
    },
    {
      field: "telephone",
      headerName: "Telephone",
      width: 150,
    },
    {
      field: "role",
      headerName: "Role",
      width: 150,
    },
    {
      field: "image",
      headerName: "Image",
      width: 150,
      renderCell: (params) => (
        <img src={params.value} alt="Employee" style={{ width: 50, height: 50 }} />
      ),
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
    dispatch(fetchEmployees());
  }, [dispatch]);

  return (
    <div>
      <div
        className="d-flex justify-content-center mb-3"
        style={{ backgroundColor: "#1976D2", color: "#fafafa" }}
      >
        <h2>Liste des Employés</h2>
      </div>
      {/* Bouton pour ajouter un employé */}
      <div className="d-flex justify-content-end m-3">
        <Link  to="/addemployee">
         <Button style={{backgroundColor:"#1976D2",color:"#ffffff"}}>Ajouter Employé </Button>
        </Link>
      </div>

      {/* Tableau des employés */}
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid columns={columns} rows={employees} slots={{ toolbar: GridToolbar }} />
      </div>

      <Dialog open={open} onClose={handleClose} sx={{ "& .MuiDialog-paper": { minWidth: 600, maxWidth: "90%", minHeight: 400 } }}>
  <DialogTitle>Détails de l'employé</DialogTitle>
  <DialogContent>
    {selectedEmployee && (
      <div>
        {selectedEmployee.image && (
        <img src={selectedEmployee.image} alt="Employee" style={{ width: 100, height: 100 }} />
      )}
        <h4>Nom: {selectedEmployee?.nom}</h4>
        <h4>Prénom: {selectedEmployee?.prenom}</h4>
        <h4>Email: {selectedEmployee?.email}</h4>
        <h4>Adresse: {selectedEmployee?.adresse}</h4>
       <h4>Telephone: {selectedEmployee?.telephone}</h4>
       <h4>Role: {selectedEmployee?.role}</h4>

        
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

export default ListEmployee;
