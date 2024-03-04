import React from 'react';
import { IoMdClose } from 'react-icons/io';
import { FaHome, FaHandshake, FaFileAlt, FaUser, FaComments } from 'react-icons/fa';
import { Dropdown,Nav } from 'react-bootstrap';
import { Link } from "react-router-dom";

export default function Sidebar({ setIsOpen }) {
  return (
    <div className='d-flex' style={{ zIndex: 5, position: 'fixed', height: '100%', width: 300 }}>
      <div className='text-white' style={{ width: '100%', backgroundColor: '#001f3f' }}>
        <div className='d-flex justify-content-between p-3'>
          <div>Logo</div>
          <div><button className='btn btn-light' onClick={() => setIsOpen(false)}><IoMdClose /></button></div>
        </div>
        <div>
          <p className="px-3"><FaHome className="mr-2" /> Dashboard</p>
          <div className="px-3 position-relative">
            <Dropdown>
              <Dropdown.Toggle variant="transparent" id="dropdown-opportunities" className="d-flex align-items-center text-white">
                <FaHandshake className="mr-2" /> 
                <span>Opportunités</span>
              </Dropdown.Toggle>
              <Dropdown.Menu className="dropdown-menu-end" style={{ left: 'auto', right: 0 }}>
                <Dropdown.Item href="#/action-1">Créer Opportunité</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Liste de Opportunités</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Vue Pipeline</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <Dropdown className="px-3">
            <Dropdown.Toggle variant="transparent" id="dropdown-quotes" className="text-white">
              <FaFileAlt className="mr-2" /> Devis
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">Créer un Devis</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Liste des Devis</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown className="px-3">
            <Dropdown.Toggle variant="transparent" id="dropdown-catalog" className="text-white">
              <FaFileAlt className="mr-2" /> Catalogue
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">Ajouter Service</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Liste des Services</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Créer une Promotion</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown className="px-3">
            <Dropdown.Toggle variant="transparent" id="dropdown-contact" className="text-white">
              <FaUser className="mr-2" /> Contact
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">Ajouter client</Dropdown.Item>
              <Nav.Link to href="/Listeclient"  > liste client</Nav.Link>
              <Dropdown.Item href="#/action-3">Ajouter un prospect</Dropdown.Item>
              <Dropdown.Item href="#/action-4">Liste de prospects</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <p className="px-3"><FaUser className="mr-2" /> Profil</p>
          <p className="px-3"><FaComments className="mr-2" /> Chat</p>
        </div>
      </div>
    </div>
  );
}
