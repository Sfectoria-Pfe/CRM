import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchClients } from "../../../store/client";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { DataGrid, GridToolbar, GridActionsCellItem } from "@mui/x-data-grid";
import { useDemoData } from "@mui/x-data-grid-generator";
import VisibilityIcon from '@mui/icons-material/Visibility';
function ListClients() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const clients = useSelector(
    (state) => state.client.clients.items
  );
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
      headerName: "Equipe Id",
      width: 150,
    },
    {
        field: "email",
        headerName: "Equipe Id",
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
    dataSet: "Employee",
    visibleFields: VISIBLE_FIELDS,
    rowLength: 100,
  });

  useEffect(() => {
    dispatch(fetchClients());
  }, [dispatch]);
  return (
    <div>
      <div className="d-flex justify-content-end m-3">
        <Link className="btn btn-light" to="addClient">
          Add Client
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
