import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addRendezvous } from '../store/Rendez-vous';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MDBContainer, MDBCard, MDBCardBody, MDBCardImage, MDBRow, MDBCol, MDBInput } from 'mdb-react-ui-kit';
import { Button } from 'react-bootstrap';

const getCurrentDate = () => {
  const currentDate = new Date();
  const formattedDate = currentDate.toISOString().slice(0, 10);
  return formattedDate;
};

function Demanderendezvous() {
  const [rendezvous, setRendezvous] = useState({
    heure: '',
    date: getCurrentDate(),
    typebien: '',
    localisation: '',
    description: '',
    clientId: '',
  });

  const dispatch = useDispatch();

  const resetForm = () => {
    setRendezvous({
      heure: '',
      date: getCurrentDate(),
      typebien: '',
      localisation: '',
      description: '',
      clientId: '',
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newValue = name === "clientId" ? parseInt(value) : value; 

    setRendezvous({ ...rendezvous, [name]: newValue });
  };

  const handleSubmit = () => {
    dispatch(addRendezvous(rendezvous))
      .then((res) => {
        if (!res.error) {
          toast.success("Le rendez-vous a été ajouté avec succès !");
          resetForm();
        } else {
          toast.error("Erreur lors de l'ajout du rendez-vous. Veuillez réessayer.");
        }
      })
      .catch(() => {
        toast.error("Erreur lors de l'ajout du rendez-vous. Veuillez réessayer.");
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
                <MDBCardImage src='https://biorecherche.fr/wp-content/uploads/2021/02/demande-de-rdv-laboratoires-bio-recherche.png' alt="Sample photo" className="rounded-start" style={{ height: '100%' }} />
              </MDBCol>
              <MDBCol md='6'>
                <MDBCardBody className='text-black d-flex flex-column justify-content-center'>
                  <h3 className="mb-4 text-uppercase fw-bold">Demande de rendez-vous</h3>
                  <MDBInput wrapperClass='mb-3' size='sm' id='heure' type='time' placeholder='Heure de rendez-vous souhaitée' name='heure' value={rendezvous.heure} onChange={handleChange} />
                  <MDBInput wrapperClass='mb-3' size='sm' id='date' type='date' placeholder='Date de rendez-vous souhaitée' name='date' value={rendezvous.date} onChange={handleChange} />
                  <select className="form-select mb-3" id="typebien" name='typebien' value={rendezvous.typebien} onChange={handleChange}>
                    <option value="">Type de bien recherché</option>
                    <option value="maison">Maison</option>
                    <option value="appartement">Appartement</option>
                    <option value="terrain">Terrain</option>
                    <option value="terrain">Autre</option>

                  </select>
                  <MDBInput wrapperClass='mb-3' size='sm' id='localisation' type='text' placeholder='Localisation préférée' name='localisation' value={rendezvous.localisation} onChange={handleChange} />
                  <textarea className="form-control mb-3" rows="4" placeholder="Description" name='description' value={rendezvous.description} onChange={handleChange}></textarea>
                  {/* <MDBInput wrapperClass='mb-3' size='sm' id='clientId' type='number' placeholder='ID du client' name='clientId' value={rendezvous.clientId} onChange={handleChange} /> */}
                  <div className="d-flex justify-content-end pt-2">
                    <Button variant='light' size='sm' onClick={resetForm}>Réinitialiser</Button>
                    <Button variant='warning' size='sm' onClick={handleSubmit}>Soumettre</Button>
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

export default Demanderendezvous;
