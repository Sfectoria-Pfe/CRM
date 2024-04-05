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
          <p>Nom: {user.nom}</p>
          <p>Prénom: {user.prenom}</p>
          <p>Prénom: {user.email}</p>

        </div>
      )}
    </div>
  );
}