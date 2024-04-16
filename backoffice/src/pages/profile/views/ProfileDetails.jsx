import React, { useEffect } from "react";
import { UserContext } from "../../../router/Router";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaUser, FaBuilding, FaAddressCard, FaPhone } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { getMe } from "../../../store/auth";
export default function ProfileDetails() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.me);
  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);


  return (
    <div>
      {user && (
        <div>
          <h2>Informations de l'utilisateur</h2>
          <img
                  src={user && user.Employee.image}
                  alt="avatar"
                  className="rounded-circle"
                  style={{ width: '150px',height:'100px' }}
                  fluid/>
          <p>Nom: {user?.Employee?.nom}</p>
          <p>Prénom: {user?.Employee?.prenom}</p>
          <p>Prénom: {user?.Employee?.email}</p>
          <p>Cin: {user?.Employee?.cin}</p>  
          <p>Adresse: {user?.Employee?.adresse}</p> 
          <p>Telephone: {user?.Employee?.telephone}</p>        </div>
      )}
    </div>
  );
}