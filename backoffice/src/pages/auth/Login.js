import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../store/auth";
import { MDBBtn, MDBContainer, MDBCard, MDBCardBody, MDBCardImage, MDBRow, MDBCol, MDBIcon, MDBInput } from 'mdb-react-ui-kit';
import logo from '../../pages/img/logo.png';

export default function Login() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    // Vérification de l'e-mail et du mot de passe
    if (email.trim() !== "" && password.trim() !== "") {
      try {
        // Effectuer la connexion
        const response = await dispatch(login({ email, password }));
        
        // Vérifier si la connexion a échoué (par exemple, mot de passe incorrect)
        if (response && response.error) {
          setError("Adresse e-mail ou mot de passe incorrect");
        } else {
          // Si la connexion réussit, réinitialiser l'erreur
          setError("");
        }
      } catch (error) {
        // Afficher un message d'erreur en cas d'erreur inattendue
        setError("Une erreur s'est produite lors de la connexion. Veuillez réessayer.");
      } finally {
        setSubmitting(false);
      }
    } else {
      // Sinon, afficher un message d'erreur
      setError("Veuillez entrer une adresse e-mail et un mot de passe");
      setSubmitting(false);
    }
  };

  return (
    <MDBContainer className="my-5">
      <MDBCard>
        <MDBRow className='g-0'>
          <MDBCol md='6'>
            <MDBCardImage src={logo} alt="login form" className='rounded-start w-100' style={{height:"590px"}}/>
          </MDBCol>
          <MDBCol md='6'>
            <MDBCardBody className='d-flex flex-column'>
              <div className='d-flex flex-row mt-2'>
                <MDBIcon fas icon="cubes fa-3x me-3" style={{ color: '#94ABD4' }}/>
                <span className="h1 " style={{ color: '#00068A' }}>Bienvenue sur votre espace </span>
              </div>
              <h5 className=" h4 fw-normal my-4 pb-3" style={{letterSpacing: '1px',color:"#00068A"}}>connecter a votre compte</h5>
              <form onSubmit={handleSubmit}>
                <MDBInput wrapperClass='h3 mb-4' label='Email ' id='formControlLg' type='email' size="lg" required value={email} onChange={(e) => setEmail(e.target.value)} />
                <MDBInput wrapperClass='h3 mb-4' label='Mot de passe' id='formControlLg' type='password' size="lg" required value={password} onChange={(e) => setPassword(e.target.value)} />
                <MDBBtn className="mb-4 px-5" style={{ backgroundColor:'#00154F' }} size='lg' disabled={submitting}>Se Connecter</MDBBtn>
                {error && <p style={{ color: 'red' }}>{error}</p>}
              </form>
              <div className='d-flex flex-row justify-content-start'>
                <a href="#!" className="small text-muted me-1">Terms of use.</a>
                <a href="#!" className="small text-muted">Privacy policy</a>
              </div>
            </MDBCardBody>
          </MDBCol>
        </MDBRow>
      </MDBCard>
    </MDBContainer>
  );
}
