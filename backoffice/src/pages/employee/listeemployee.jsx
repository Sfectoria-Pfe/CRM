import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployees } from "../../store/employee";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { DataGrid, GridToolbar, GridActionsCellItem } from "@mui/x-data-grid";
import { useDemoData } from "@mui/x-data-grid-generator";
import VisibilityIcon from '@mui/icons-material/Visibility';
function ListEmployee() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const employees = useSelector((state) => state.employees && state.employees.employee && state.employees.employee.items);

  const columns = [
    {
      field: "id",
      headerName: "employee ID ",
      width: 150,
    },
    {
      field: "cin",
      headerName: "cin",
      width: 150,
    },
    {
      field: "nom",
      headerName: "nom",
      width: 150,
    },
    {
      field: "prenom",
      headerName: "prenom",
      width: 150,
    },
    {
      field: "adresse",
      headerName: "adresse",
      width: 150,
    },
    {
      field: "email",
      headerName: "email",
      width: 150,
    },
    {
      field: "image",
      headerName: "image",
      width: 150,
    },
    {
      field: "actions",
      type: "actions",
      width: 80,
      getActions: (row) => {
        return [
          <GridActionsCellItem
            disableFocusRipple={false}
            icon={<VisibilityIcon />}
            label="Look"
            size="small"
            edge="start"
            onClick={() => {
              navigate(`${row.id}`);
            }}
          />,
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
  const { data } = useDemoData({
    dataSet: "employee",
    visibleFields: VISIBLE_FIELDS,
    rowLength: 100,
  });

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);
  return (
    <div>
      <div className="d-flex justify-content-end m-3">
      <Link className="btn btn-light" to="/addemployee">
          Add Employee
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

export default ListEmployee;