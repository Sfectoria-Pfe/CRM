import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { sendDemandeDevis } from "../store/demande";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBInput,
} from 'mdb-react-ui-kit';
import { Button } from "react-bootstrap";

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
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newValue = name === "clientId" ? parseInt(value) : value; 
    setDemandeDevis({ ...demandeDevis, [name]: newValue });
  };

  const handleAddDemandeDevis = () => {
    dispatch(sendDemandeDevis(demandeDevis))
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
    <MDBContainer className='py-3' style={{ backgroundColor: "#c8e6c9" }}>
      <ToastContainer /> 
      <MDBRow className='justify-content-center'>
        <MDBCol md='10'>
          <MDBCard className='my-2'>
            <MDBRow className='g-0'>
              <MDBCol md='6' className="d-none d-md-block">
                <MDBCardImage src='https://www.qualit-enr.org/wp-content/uploads/2020/12/Devis2.png' alt="Sample photo" className="rounded-start" style={{ height: '100%' }} />
              </MDBCol>
              <MDBCol md='6'>
                <MDBCardBody className='text-black d-flex flex-column justify-content-center'>
                  <h3 className="mb-4 text-uppercase fw-bold">Demande de devis</h3>
                  <MDBInput
                    className="form-control mb-3"
                    placeholder="Date de demande"
                    name="dateDemande"
                    type="date"
                    value={demandeDevis.dateDemande}
                    onChange={handleChange}
                  />
                  <MDBInput
                    className="form-control mb-3"
                    placeholder="Sujet"
                    name="sujet"
                    value={demandeDevis.sujet}
                    onChange={handleChange}
                  />
                  <MDBInput
                    className="form-control mb-3"
                    placeholder="Description"
                    name="description"
                    value={demandeDevis.description}
                    type="text-area"
                    onChange={handleChange}
                  />
                  
                  <div className="d-flex justify-content-end pt-2">
                    <Button className="custom-button" onClick={handleAddDemandeDevis} >
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
