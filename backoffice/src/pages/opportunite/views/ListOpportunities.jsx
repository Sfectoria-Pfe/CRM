import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOpportunites } from "../../../store/opportunite";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { DataGrid, GridToolbar, GridActionsCellItem } from "@mui/x-data-grid";
import { useDemoData } from "@mui/x-data-grid-generator";
import VisibilityIcon from '@mui/icons-material/Visibility';
function ListOpportunities() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const opportunities = useSelector(
    (state) => state?.opportunite.opportunites.items
  );
  const columns = [
    {
      field: "id",
      headerName: "Opportunity ID ",
      width: 150,
    },
    {
      field: "title",
      headerName: "Name ",
      width: 150,
    },
    {
      field: "equipeId",
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
    dispatch(fetchOpportunites());
  }, [dispatch]);
  return (
    <div>
      <div className="d-flex justify-content-center mb-3" style={{backgroundColor:"#1976D2",color:"#fafafa"}}>
        <h2>Liste des Opportunités</h2>
      </div>     
      <div className="d-flex justify-content-end m-3" >
        <Link className="btn btn-light" style={{backgroundColor:"#81d4fa"}} to="add">
          Add Opportunity
        </Link>
      </div>
      
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          columns={columns}
          rows={opportunities}
          slots={{ toolbar: GridToolbar }}
        />
      </div>
    </div>
  );
}

export default ListOpportunities;
