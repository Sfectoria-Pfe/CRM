import React, { useEffect } from "react";
import { UserContext } from "../../../router/Router";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaUser, FaBuilding, FaAddressCard, FaPhone } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { getMe } from "../../../store/auth";
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBBtn, MDBTypography } from 'mdb-react-ui-kit';

export default function ProfileDetails() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.me);
  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  const navigate=useNavigate()

  return (
    <div className=" gradient-custom-2 shadow p-3 mb-5 bg-white rounded"style={{backgroundImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMkbNiuBACRu6sLsIlT1MW4lSJlHnQG1yeVg&s'}}>
    <MDBContainer className="py-5 h-90">
      <MDBRow className="justify-content-center align-items-center h-100">
        <MDBCol lg="9" xl="7">
          <MDBCard>
            <div className="rounded-top text-white d-flex flex-row" style={{background: 'linear-gradient(to bottom, #007bff, #0062cc)', height: '200px' }}>
            <div style={{ position: 'relative', width: '150px' }}>
                    {user && user.Employee.image ? (
                      <MDBCardImage src={user.Employee.image} alt="Profile Picture" className="mt-4 mb-2 img-thumbnail" fluid style={{ width: '150px', zIndex: '1' }} />
                    ) : (
                      <FaUser size={150} color="white" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, margin: 'auto' }} />
                    )}
                  </div>
              <div className="ms-3" style={{ marginTop: '130px' }}>
                <MDBTypography tag="h5">{user?.Employee?.nom} {user?.Employee?.prenom}</MDBTypography>
              </div>
            </div>
            <div className="p-4 text-black" style={{ backgroundColor: '#f8f9fa' }}>
              <div className="">
              <MDBBtn onClick={()=>navigate("edit")} outline color="dark" style={{height: '36px', overflow: 'visible'}}>
                  Edit profile
                </MDBBtn>
              </div>
            </div>
            <MDBCardBody className="text-black p-4">
                <div className="mb-5">
                  <p className="lead fw-normal mb-1">Les Autres informations: </p>
                  <div className="p-4" style={{ backgroundColor: '#f8f9fa' }}>
                    <div style={{ marginBottom: '10px' }}>
                      <FaBuilding size={20} color="#007bff" style={{ marginRight: '10px' }} />
                      <span style={{ fontWeight: 'bold', color: '#007bff' }}>Adresse: </span>{user?.Employee?.adresse}
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                      <FaPhone size={20} color="#007bff" style={{ marginRight: '10px' }} />
                      <span style={{ fontWeight: 'bold', color: '#007bff' }}>Telephone: </span>{user?.Employee?.telephone}
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                      <FaEnvelope size={20} color="#007bff" style={{ marginRight: '10px' }} />
                      <span style={{ fontWeight: 'bold', color: '#007bff' }}>Email: </span>{user?.Employee?.email}
                    </div>
                  </div>
                </div>
              </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  </div>
  )
}