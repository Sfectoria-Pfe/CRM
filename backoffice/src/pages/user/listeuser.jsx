import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../../store/user";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { DataGrid, GridToolbar, GridActionsCellItem } from "@mui/x-data-grid";
import { useDemoData } from "@mui/x-data-grid-generator";
import Adduser from "./adduser";
import VisibilityIcon from '@mui/icons-material/Visibility';

function ListUser() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector((state) => state.user.users.items);
  const columns = [
    {
      field: "id",
      headerName: "User ID",
      width: 150,
    },
    {
      field: "email",
      headerName: "Email",
      width: 150,
    },
    {
      field: "password",
      headerName: "Password",
      width: 150,
    },
    {
      field: "isClient",
      headerName: "Is Client",
      width: 150,
    },
    {
      field: "employeeId",
      headerName: "Employee ID",
      width: 150,
    },
    {
      field: "clientId",
      headerName: "Client ID",
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

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  return (
    <div>
      <div className="d-flex">
        <div style={{ width: "55%", height: "calc(100vh - 300px)" }}>
          <DataGrid
            columns={columns}
            rows={users}
            pageSize={5}
            rowsPerPageOptions={[5, 10, 20]}
            pagination
            autoHeight
            disableColumnMenu
            disableSelectionOnClick
            components={{ Toolbar: GridToolbar }}
          />
        </div>
        <div style={{ width: "2%" }}></div> {/* Adjust the width for spacing */}
        <div style={{ width: "40%", height: "calc(100vh - 200px)" }}>
<Adduser />
        </div>
      </div>
    </div>
  );
}

export default ListUser;