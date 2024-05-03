import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginClient } from "../store/auth";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBInput
}
from 'mdb-react-ui-kit';
import "react-toastify/dist/ReactToastify.css";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginClient({ password, email }))
      .then((res) => {
        if (!res.error) {
          toast.success("Votre compte a été ajouté avec succès !");
          setTimeout(() => {
            navigate("/profile");
          }, 2000);
        } else {
          toast.error("Erreur lors de la connexion du compte. Veuillez vérifier votre email et mot de passe.");
        }
      })
      .catch((error) => {
        toast.error("Erreur lors de la connexion du compte. Veuillez réessayer.");
      });
  };

  return (
    <MDBContainer className="my-5">
      <MDBCard>
        <MDBRow className='g-0'>
          <MDBCol md='6'>
            <MDBCardImage src='https://www.smoothtalker.com/wp-content/uploads/2021/10/login@4x-1024x904.png'/>
          </MDBCol>
          <MDBCol md='6'>
            <MDBCardBody className='d-flex flex-column'>
              <div className='d-flex flex-row mt-2'>
                <MDBIcon fas icon="cubes fa-3x me-3" style={{ color: '#1BBFA8' }}/>
                <span className="h1 fw-bold mb-0">Maison+</span>
              </div>
              <h5 className="fw-normal my-4 pb-3" style={{letterSpacing: '1px'}}>connexion</h5>
              <form onSubmit={handleLogin}>
                <MDBInput wrapperClass='mb-4' label='Email address' id='formControlLg' type='email' size="lg" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                <MDBInput wrapperClass='mb-4' label='Password' id='formControlLg' type='password' size="lg" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                <button className="btn btn-dark mb-4 px-5" onClick={handleLogin}>Login</button>
              </form>
              <p>
                Vous n'avez pas de compte ?{" "}
                <Link to="/SignupForm">Inscrivez-vous ici</Link>.
              </p>
              <ToastContainer />
            </MDBCardBody>
          </MDBCol>
        </MDBRow>
      </MDBCard>
    </MDBContainer>
  );
};

export default LoginForm;
