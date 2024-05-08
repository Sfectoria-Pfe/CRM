import React, { useEffect } from 'react';
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn
} from 'mdb-react-ui-kit';
import { useDispatch, useSelector } from 'react-redux';
import { getMe } from '../store/auth';
import { FaEnvelope, FaAddressCard, FaPhone } from 'react-icons/fa';
import { Link, useHistory } from 'react-router-dom';

export default function ProfilePage() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.me);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

 

  return (
    <section style={{ backgroundColor: '#eee' }}>
      <MDBContainer className="py-5">
        <MDBRow>
          <MDBCol lg="4">
            <MDBCard className="mb-4 h-100" style={{ backgroundColor: '#43a047' }}>
              <MDBCardBody className="text-center" style={{ backgroundColor: '#c8e6c9' }}>
                <MDBCardImage
                  src={user && user.Client.image}
                  alt="avatar"
                  className="rounded-circle"
                  style={{ width: '150px',height:'150px' }}
                  fluid
                /><br/><br/>
                <h4 >Bienvenue:{user && `${user.Client.nom} ${user.Client.prenom}`}</h4>
                <h5 >{user && user.Client.adresse}</h5>
                <div className="d-flex justify-content-center mb-2">
  <Link to="/editProfile" className="btn btn-outline-primary ms-1">Modifier votre informations</Link>
</div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>

          <MDBCol lg="8">
            <MDBCard className="mb-4">
              <MDBCardBody>
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText className="fw-bold"style={{ color: '#00c853' }}>Full Name</MDBCardText>
                  </MDBCol><br/><br/>
                  <MDBCol sm="9">
                    <MDBCardText className="fw-bold">{user && `${user.Client.nom} ${user.Client.prenom}`}</MDBCardText>
                  </MDBCol><br/><br/>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText className="fw-bold" style={{ color: '#00c853' }}>Email</MDBCardText>
                  </MDBCol><br/><br/>
                  <MDBCol sm="9">
                    <MDBCardText className="fw-bold">{user && user.Client.email}</MDBCardText>
                  </MDBCol><br/><br/>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText className="fw-bold" style={{ color: '#00c853' }}>Phone</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="fw-bold">{user && user.Client.telephone}</MDBCardText>
                  </MDBCol><br/><br/>
                </MDBRow>
                <hr />
               
                
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText className="fw-bold" style={{ color: '#00c853' }}>Address</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="fw-bold">{user && user.Client.adresse}</MDBCardText>
                  </MDBCol><br/><br/><br/><br/>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
}
