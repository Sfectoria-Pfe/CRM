import React from 'react';
import { AiOutlineUser, AiOutlinePhone, AiOutlineMail } from 'react-icons/ai'; // Importez les icônes souhaitées
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function Demandedevis() {
  return (
    <div>
    <div className="demande-container">
      <h1>Demande Devis</h1>
      <div className="form-container">
        <FloatingLabel controlId="floatingInputNom" label={<span><AiOutlineUser /> Votre nom</span>} className="mb-3">
          <Form.Control type="text" placeholder="Votre nom" />
        </FloatingLabel>
        <FloatingLabel controlId="floatingInputTel" label={<span><AiOutlinePhone /> Numéro de téléphone</span>} className="mb-3">
          <Form.Control type="tel" placeholder="Numéro de téléphone" />
        </FloatingLabel>
        <FloatingLabel controlId="floatingInputEmail" label={<span><AiOutlineMail /> Adresse email</span>} className="mb-3">
          <Form.Control type="email" placeholder="name@example.com" />
        </FloatingLabel>
        <FloatingLabel controlId="floatingTextareaSujet" label="Sujet" className="mb-3">
          <Form.Control as="textarea" placeholder="Sujet" />
        </FloatingLabel>
        <FloatingLabel controlId="floatingTextareaDescription" label="Décrivez votre besoin" className="mb-3">
          <Form.Control as="textarea" placeholder="Décrivez votre besoin" style={{ height: '100px' }} />
        </FloatingLabel>
        <Button style={{backgroundColor:"#25A760"}} >Envoyer</Button>
      </div>
    </div>
    </div>);
}

export default Demandedevis;
