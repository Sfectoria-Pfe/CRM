import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployees } from "../../store/employee"; // Assurez-vous que le chemin est correct
import { Link, useNavigate } from "react-router-dom";
import { DataGrid, GridToolbar, GridActionsCellItem } from "@mui/x-data-grid";
import VisibilityIcon from "@mui/icons-material/Visibility";

function ListEmployee() { 
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const employees = useSelector(state => state.employee.employees.items);

  const columns = [
    {
      field: "id",
      headerName: "Employee ID", // Renommé Client ID en Employee ID
      width: 150,
    },
    {
      field: "nom",
      headerName: "Nom", // Renommé Name en Nom
      width: 150,
    },
    {
      field: "prenom",
      headerName: "Prenom", // Renommé Prenom en Prenom
      width: 150,
    },
    {
      field: "email",
      headerName: "Email", // Renommé Email en Email
      width: 150,
    },
    {
      field: "adresse",
      headerName: "Adresse", // Renommé Adress en Adresse
      width: 150,
    },
    {
      field: "telephone",
      headerName: "Telephone", // Renommé Telephone en Telephone
      width: 150,
    },
    {
      field: "role",
      headerName: "Role", // Renommé Telephone en Telephone
      width: 150,
    },
    {
      field: "image",
      headerName: "Image", // Renommé Image en Image
      width: 150,
      renderCell: (params) => (
        <img
          src={params.value}
          alt="Employee"
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
          <Link to={`/employees/${row.id}`} key={row.id}>
            {" "}
            <GridActionsCellItem
              disableFocusRipple={false}
              icon={<VisibilityIcon />}
              label="Voir"
              size="small"
              edge="start"
              // onClick={() => {
              //   navigate(`/employees/${row.id}`); // Renommé clients en employees et client en employee
              // }}
            />
          </Link>,
        ];
      },
    },
  ];

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  return (
    <div>
      <div className="d-flex justify-content-end m-3">
        <Link className="btn btn-light" to="addEmployee"> {/* Renommé addClient en addEmployee */}
          Ajouter Employé {/* Renommé Add Client en Ajouter Employé */}
        </Link>
      </div>

      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          columns={columns}
          rows={employees}
          slots={{ toolbar: GridToolbar }}
        />
      </div>
    </div>
  );
}

export default ListEmployee; // Renommé ListClients en ListEmployees
