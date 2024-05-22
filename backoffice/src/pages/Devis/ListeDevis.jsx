import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDevis } from "../../store/devis";
import { Link, useNavigate } from "react-router-dom";
import { DataGrid, GridToolbar, GridActionsCellItem } from "@mui/x-data-grid";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AddIcon from "@mui/icons-material/Add"; // Importer l'icône d'ajout

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
      field: "invoiceNumber",
      headerName: "Numéro de devis",
      width: 150,
    },
    {
      field: "dateOfIssue",
      headerName: "Date d'estimation",
      width: 200,
    },
    {
      field: "total",
      headerName: "Montant total",
      width: 150,
    },
    {
      field: "discountAmount",
      headerName: "Promotion",
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
      width: 100, // Augmentez la largeur pour permettre l'affichage de l'icône d'ajout
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
      <div className="d-flex justify-content-between m-3">
        <div
          className="d-flex justify-content-center mb-3"
          style={{ backgroundColor: "#1976D2", color: "#fafafa",width:"200%" }}
        >
          <h2>Liste Devis</h2>
        </div>
        {/* Ajout du lien vers la page d'ajout de devis */}
        {/* <Link to="/ajouter-devis" className="btn btn-primary">
          <AddIcon /> Ajouter devis
        </Link> */}
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
