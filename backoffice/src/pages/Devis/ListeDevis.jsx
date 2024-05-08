import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDevis } from "../../store/devis";
import { Link, useNavigate } from "react-router-dom";
import { DataGrid, GridToolbar, GridActionsCellItem } from "@mui/x-data-grid";
import VisibilityIcon from "@mui/icons-material/Visibility";

function ListDevis() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const devis = useSelector((state) => state.devis.devis.items);

  const columns = [
    {
      field: "id",
      headerName: "Devis ID",
      width: 150,
    },
    {
      field: "invoiceNumber ",
      headerName: "Numéro de devis",
      width: 150,
    },
    {
      field: "dateOfIssue",
      headerName: "Date d'estimation",
      width: 200,
    },
    {
      field: " Montant Total ",
      headerName: "Montant total",
      width: 150,
    },
    
    {
        field: "clientId",
        headerName: "clientId",
        width: 150,
      },
    {
      field: "actions",
      type: "actions",
      width: 80,
      getActions: (row) => {
        return [
          <Link to={`${row.id}`} key={row.id}>
            <GridActionsCellItem
              disableFocusRipple={false}
              icon={<VisibilityIcon />}
              label="Look"
              size="small"
              edge="start"
              onClick={() => {
                navigate(`/devis/${row.id}`);
              }}
            />
          </Link>,
        ];
      },
    },
  ];

  useEffect(() => {
    dispatch(fetchDevis());
  }, [dispatch]);

  return (
    <div>
      <div className="d-flex justify-content-end m-3">
        <Link className="btn btn-light" to="addDevis">
          Add Devis
        </Link>
      </div>

      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          columns={columns}
          rows={devis}
          slots={{ toolbar: GridToolbar }}
        />
      </div>
    </div>
  );
}

export default ListDevis;
