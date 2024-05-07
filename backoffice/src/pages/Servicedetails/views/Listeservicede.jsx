import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchServiceDetails } from "../../../store/serviceDetails";
import { Link, useNavigate } from "react-router-dom";
import { DataGrid, GridToolbar, GridActionsCellItem } from "@mui/x-data-grid";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AddServiceDetail from "./AddServicede";

function ListServiceDetails() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const serviceDetails  = useSelector((state) => state.serviceDetails.serviceDetails.items);

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 150,
    },
    {
      field: "title",
      headerName: "Title",
      width: 150,
    },
    {
      field: "description",
      headerName: "Description",
      width: 200,
    },
    {
      field: "address",
      headerName: "Address",
      width: 200,
    },
    {
      field: "price",
      headerName: "Price",
      width: 150,
    },
    {
        field: "serviceId",
        headerName: "service",
        width: 150,
      },
    {
      field: "imageURL",
      headerName: "Image",
      width: 150,
      renderCell: (params) => (
        <img
          src={params.value}
          alt="Service Detail"
          style={{ width: 50, height: 50 }}
        />
      ),
    },
    {
      field: "actions",
      type: "actions",
      width: 80,
      getActions: (row) => [
        <Link to={`${row.id}`} key={row.id}>
          <GridActionsCellItem
            disableFocusRipple={false}
            icon={<VisibilityIcon />}
            label="Look"
            size="small"
            edge="start"
            onClick={() => {
              navigate(`/service-details/${row.id}`);
            }}
          />
        </Link>,
      ],
    },
  ];

  useEffect(() => {
    dispatch(fetchServiceDetails());
  }, [dispatch]);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-6">
          <div className="d-flex justify-content-center mb-3" style={{ backgroundColor: "#1976D2", color: "#fafafa" }}>
            <h2>Liste des détails de service</h2>
          </div>
          <br />
          <br />
          <br />
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid
              columns={columns}
              rows={serviceDetails}
              slots={{ toolbar: GridToolbar }}
            />
          </div>
        </div>
        <div className="col-md-6" style={{ height: 400}}>
          <AddServiceDetail />
        </div>
      </div>
    </div>
  );
}
export default ListServiceDetails;
