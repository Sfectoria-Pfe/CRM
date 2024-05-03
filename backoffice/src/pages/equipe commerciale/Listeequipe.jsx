import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEquipesCommerciales } from "../../store/Equipe";
import { Link } from "react-router-dom";
import { DataGrid, GridToolbar, GridActionsCellItem } from "@mui/x-data-grid";
import VisibilityIcon from "@mui/icons-material/Visibility";

function ListEquipeCommerciale() {
  const dispatch = useDispatch();
  const equipesCommerciales = useSelector(
    (state) => state.Equipe.equipesCommerciales.items
  );
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
      field: "nombre",
      headerName: "Nombre",
      width: 300,
    },
    {
      field: "actions",
      type: "actions",
      width: 80,
      getActions: (row) => {
        return [
          <Link to={`/equipescommerciale/${row.id}`} key={row.id}>
            {" "}
            <GridActionsCellItem
              disableFocusRipple={false}
              icon={<VisibilityIcon />}
              label="Voir"
              size="small"
              edge="start"
            />
          </Link>,
        ];
      },
    },
  ];

  useEffect(() => {
    dispatch(fetchEquipesCommerciales());
  }, [dispatch]);

  return (
    <div>
      <div className="d-flex justify-content-end m-3">
        <Link className="btn btn-light" to="/AddEquipeCommerciale">
          Ajouter une équipe commerciale
        </Link>
      </div>

      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          columns={columns}
          rows={equipesCommerciales}
          slots={{ toolbar: GridToolbar }}
        />
      </div>
    </div>
  );
}

export default ListEquipeCommerciale;
