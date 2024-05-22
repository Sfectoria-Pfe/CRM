import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendDemandeDevis } from "../store/demande";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MDBBtn, MDBContainer, MDBCard, MDBCardBody, MDBCardImage, MDBRow, MDBCol, MDBInput } from "mdb-react-ui-kit";
import { Button } from "react-bootstrap";
import { FormControl, MenuItem, Select, OutlinedInput, Checkbox, ListItemText } from "@mui/material";
import { fetchServices } from "../store/services"; // Import fetchServices et fetchService

const getCurrentDate = () => {
  const currentDate = new Date();
  const formattedDate = currentDate.toISOString().slice(0, 10);
  return formattedDate;
};

export default function AddDemandeDevis() {
  const [demandeDevis, setDemandeDevis] = useState({
    dateDemande: getCurrentDate(),
    description: "",
    sujet: "",
    clientId: "",
    memberIds: [], // Utilisez memberIds pour stocker les ID des services sélectionnés
  });
  const [services, setServices] = useState([]); // State local pour stocker les services
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const servicesState = useSelector((state) => state.services.services.items); // Sélecteur pour obtenir les services du state Redux

  useEffect(() => {
    // Charger les services dès que le composant est monté
    dispatch(fetchServices())
      .then((res) => {
        // Stocker les services dans le state local
        setServices(res.payload);
      })
      .catch((error) => {
        console.error("Error fetching services:", error);
      });
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newValue = name === "clientId" ? parseInt(value) : value;
    setDemandeDevis((prevState) => ({
      ...prevState,
      [name]: newValue,
    }));
  };

  const handleMemberSelection = (e) => {
    const { value } = e.target;
    // Obtenez les titres des services sélectionnés
    const selectedTitles = value.map((selectedId) => {
      const selectedService = services.find((service) => service.id === selectedId);
      return selectedService ? selectedService.name : '';
    });
    // Mettre à jour le champ "sujet" avec les titres sélectionnés
    setDemandeDevis((prevState) => ({
      ...prevState,
      sujet: selectedTitles.join(', '), // Concaténez les titres sélectionnés en une chaîne séparée par des virgules
      memberIds: value, // Mettez à jour les IDs des services sélectionnés
    }));
  };

  const handleAddDemandeDevis = () => {
    console.log("Demande de devis avant envoi :", demandeDevis);
    dispatch(sendDemandeDevis({
      ...demandeDevis,
      sujet: demandeDevis.sujet // Ajoutez le sujet ici
    }))
    .then((res) => {
      if (!res.error) {
        toast.success("La demande de devis a été ajoutée avec succès !");
        setTimeout(() => {
          navigate(-1);
        }, 2000);
      } else {
        toast.error("Erreur lors de l'ajout de la demande de devis. Veuillez réessayer.");
      }
    })
    .catch((error) => {
      toast.error("Erreur lors de l'ajout de la demande de devis. Veuillez réessayer.");
    });
  };

  return (
    <MDBContainer className="py-3" style={{ backgroundColor: "#c8e6c9" }}>
      <ToastContainer />
      <MDBRow className="justify-content-center">
        <MDBCol md="10">
          <MDBCard className="my-2">
            <MDBRow className="g-0">
              <MDBCol md="6" className="d-none d-md-block">
                <MDBCardImage src="https://www.qualit-enr.org/wp-content/uploads/2020/12/Devis2.png" alt="Sample photo" className="rounded-start" style={{ height: "100%" }} />
              </MDBCol>
              <MDBCol md="6">
                <MDBCardBody className="text-black d-flex flex-column justify-content-center">
                  <h3 className="mb-4 text-uppercase fw-bold">Demande de devis</h3>
                  <MDBInput
                    className="form-control mb-3"
                    placeholder="Date de demande"
                    name="dateDemande"
                    type="date"
                    value={demandeDevis.dateDemande}
                    onChange={handleChange}
                  />
                  <FormControl style={{ marginBottom: 20 }}>
                    <legend>Choisir sujet :</legend>
                    <Select
                      style={{ width: 440, height: 30 }}
                      labelId="demo-multiple-checkbox-label"
                      id="demo-multiple-checkbox"
                      multiple
                      value={demandeDevis.memberIds}
                      onChange={handleMemberSelection}
                      input={<OutlinedInput label="service" />}
                      renderValue={(selected) =>
                        services
                          .filter((elem) => selected.includes(elem.id))
                          .map((elem) => `${elem.name}`)
                          .join(", ")
                      }
                    >
                      {services.map((elem) => (
                        <MenuItem key={elem.id} value={elem.id}>
                          <Checkbox
                            checked={demandeDevis.memberIds.includes(elem.id)}
                            color="primary"
                          />
                          <ListItemText primary={`${elem.name}`} />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <MDBInput
                    className="form-control mb-3"
                    placeholder="Description"
                    name="description"
                    value={demandeDevis.description}
                    type="text-area"
                    onChange={handleChange}
                  />
                  <div className="d-flex justify-content-end pt-2">
                    <Button className="custom-button" onClick={handleAddDemandeDevis}>
                      Ajouter
                    </Button>
                  </div>
                </MDBCardBody>
              </MDBCol>
            </MDBRow>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}
