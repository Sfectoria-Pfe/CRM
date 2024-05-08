import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchServices } from "../../../store/services";
import { Link } from "react-router-dom";
import { DataGrid, GridToolbar, GridActionsCellItem } from "@mui/x-data-grid";
import VisibilityIcon from "@mui/icons-material/Visibility";

function ServiceListe() {
  const dispatch = useDispatch();
  const services = useSelector((state) => state.service.services.items);

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 150,
    },
    {
      field: "name",
      headerName: "Nom",
      width: 150,
    },
    {
      field: "description",
      headerName: "Description",
      width: 150,
    },
    {
      field: "type",
      headerName: "Type",
      width: 150,
    },
    {
      field: "price",
      headerName: "Prix",
      width: 150,
    },
    {
      field: "imageURL",
      headerName: "URL de l'image",
      width: 150,
      renderCell: (params) => (
        <img src={params.value} alt="Image" style={{ width: 50, height: 50 }} />
      ),
    },
    {
      field: "actions",
      type: "actions",
      width: 80,
      getActions: (row) => {
        return [
          
          <Link to={`/services/${row.id}`} key={row.id}>
           
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
    dispatch(fetchServices());
  }, [dispatch]);

  return (
    <div>
      
      <div
        className="d-flex justify-content-center mb-3"
        style={{ backgroundColor: "#1976D2", color: "#fafafa" }}
      >
        <h2>Liste des Services</h2>
      </div>
      <div className="d-flex justify-content-end m-3">
        <Link className="btn btn-light" style={{backgroundColor:"#81d4fa"}} to="addservice ">
          Ajouter Service
        </Link>
      </div>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          columns={columns}
          rows={services}
          slots={{ toolbar: GridToolbar }}
        />
      </div>
    </div>
  );
}

export default ServiceListe;
