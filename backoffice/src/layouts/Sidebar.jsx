import React from 'react';
import { IoMdClose } from 'react-icons/io';
import { FaHome, FaHandshake, FaFileAlt, FaUser, FaComments } from 'react-icons/fa';
import { Dropdown, Nav } from 'react-bootstrap';
import { Link } from "react-router-dom";
import './Styleside.css'
export default function Sidebar({ setIsOpen }) {
  return (
    <div  className='sidebar d-flex' style={{ zIndex: 5, position: 'fixed', height: '100%', width: 300 }}>
      <div className='text-white' style={{ width: '100%', backgroundColor: '#001f3f' }}>
        <div className='d-flex justify-content-Between p-0.1'           style={{ width: "90px", height: "90px" }}>
             <img src="data:image/png;base64,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" alt="Logo" className="logo" />
          <div><button className='btn btn-light' onClick={() => setIsOpen(false)}><IoMdClose /></button></div>
        </div>
        <div>
          <p className="px-3"><FaHome className="mr-2" /> Dashboard</p>
          <div className="px-3 position-relative">
            {/* <Dropdown>
              <Dropdown.Toggle variant="transparent" id="dropdown-opportunities" className="d-flex align-items-center text-white">
                <FaHandshake className="mr-2" /> 
                <span>Opportunités</span>
              </Dropdown.Toggle>
              <Dropdown.Menu className="dropdown-menu-end" style={{ left: 'auto', right: 0 }}>
                <Dropdown.Item href="#/action-1">Créer Opportunité</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Liste de Opportunités</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Vue Pipeline</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown> */}
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
            <Link to="/addService" className="dropdown-item" style={{ color: '#000', fontSize: '18px', marginRight: '10px' }}>Ajouter Service</Link>
              <Link to="/listeService" className="dropdown-item" style={{ color: '#000', fontSize: '18px', marginRight: '10px' }}>liste Service</Link>
              <Link to="/AddVente" className="dropdown-item" style={{ color: '#000', fontSize: '18px', marginRight: '10px' }}>Ajouter Vente</Link>
              <Link to="/addLocation" className="dropdown-item" style={{ color: '#000', fontSize: '18px', marginRight: '10px' }}>Ajouter Location</Link>
              <Link to="/ListeVente" className="dropdown-item" style={{ color: '#000', fontSize: '18px', marginRight: '10px' }}>Liste de Ventes</Link>
              <Link to="/listeLocation" className="dropdown-item" style={{ color: '#000', fontSize: '18px', marginRight: '10px' }}>Liste de Locations</Link>
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown className="px-3">
            <Dropdown.Toggle variant="transparent" id="dropdown-contact" className="text-white">
              <FaUser className="mr-2" /> Contact
            </Dropdown.Toggle>
            <Dropdown.Menu>
             
            <Nav.Link to href="/Listeclient" style={{ color: '#000', fontSize: '18px', marginRight: '10px' }}> ajouter client</Nav.Link>
      {/* <Nav.Link to href="/addService.jsx" style={{ color: '#000', fontSize: '18px', marginRight: '10px' }}>ajouter Service</Nav.Link> */}
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
