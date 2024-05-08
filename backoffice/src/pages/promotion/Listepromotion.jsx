import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPromotion } from "../../store/promotion";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { DataGrid, GridToolbar, GridActionsCellItem } from "@mui/x-data-grid";
import { useDemoData } from "@mui/x-data-grid-generator";
import VisibilityIcon from '@mui/icons-material/Visibility';
function ListPromotion() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const promotions = useSelector(
    (state) => state.promotion.promotions.items
  );
  const columns = [
    {
      field: "id",
      headerName: "promotion ID ",
      width: 150,
    },
    {
      field: "description",
      headerName: "description",
      width: 150,
    },
    {
      field: "pourcentage",
      headerName: "pourcentage",
      width: 150,
    },
    {
      field: "date_debut",
      headerName: "date_debut",
      width: 150,
    },
    {
      field: "date_fin",
      headerName: "date_fin",
      width: 150,
    },
    {
      field: "opportuniteId",
      headerName: "opportuniteId",
      width: 150,
    },
    {
      field: "categorieId",
      headerName: "categorieId",
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
    dataSet: "promotion",
    visibleFields: VISIBLE_FIELDS,
    rowLength: 100,
  });

  useEffect(() => {
    dispatch(fetchPromotion());
  }, [dispatch]);
  return (
    <div>
      <div
        className="d-flex justify-content-center mb-3"
        style={{ backgroundColor: "#1976D2", color: "#fafafa" }}
      >
        <h2>Liste des Promotions</h2>
      </div>{" "}
      {/* <div className="d-flex justify-content-end m-3">
      <Link className="btn btn-light" to="/Addpromotion">
          Add promotion
        </Link> */}
      {/* </div> */}

      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          columns={columns}
          rows={promotions}
          slots={{ toolbar: GridToolbar }}
        />
      </div>
    </div>
  );
}

export default ListPromotion;