import React, { Component } from 'react';
import { Container, Nav, Button, Offcanvas, Form, Dropdown } from 'react-bootstrap'; 
import { FaHome, FaShoppingCart, FaCog, FaBars, FaUser, FaCommentDots, FaHistory, FaCalendarAlt, FaSignOutAlt } from 'react-icons/fa';
import { Link } from "react-router-dom";
// import Demande_devis from './component/page/demandedevis.js';

class VerticalNavbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showOffcanvas: false
    };
  }

  handleToggleOffcanvas = () => {
    this.setState({ showOffcanvas: !this.state.showOffcanvas });
  }

  render() {
    const { showOffcanvas } = this.state;

    return (
      <Container fluid>
        {/* Barre de navigation principale avec des liens */}
        <Nav className="mb-3 d-none d-md-flex align-items-center" style={{ backgroundColor: '#f8f9fa', color: '#000', padding: '10px', borderRadius: '5px' }}>
          {/* Logo */}
          <img src="/path/to/your/logo.png" alt="Logo" style={{ width: '50px', marginRight: '10px' }} />
          
          {/* Liens pour produits et services */}
          <Nav.Item>
            <Nav.Link as={Link} to="/" style={{ color: '#000', fontSize: '18px', marginRight: '10px' }}><FaHome /> Home</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="#" style={{ color: '#000', fontSize: '18px', marginRight: '10px' }}><FaShoppingCart /> Produits</Nav.Link>
          </Nav.Item>
          <Nav.Item>
          <Nav.Link as={ Link } to="/demandedevis" style={{ color: '#000', fontSize: '18px', marginRight: '10px' }}><FaHome /> Service</Nav.Link>
          </Nav.Item>
          
          {/* Paramètres */}
          <Nav.Item className="ms-auto">
            <Dropdown>
              <Dropdown.Toggle variant="transparent" id="dropdown-basic" style={{ color: '#000', fontSize: '18px', right: '20px' }}>
                <FaCog />
                <span style={{ marginLeft: '5px' }}>Paramètres</span>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item><FaUser /> Mon compte</Dropdown.Item>
                <Dropdown.Item><FaCommentDots /> Demande Devis</Dropdown.Item>
                <Dropdown.Item><FaHistory /> Historique</Dropdown.Item>
                <Dropdown.Item><FaCalendarAlt /> Demande Rendez-vous</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item><FaSignOutAlt /> Déconnexion</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav.Item>
        </Nav>
        
        {/* Bouton pour afficher la sidebar sur les appareils mobiles */}
        
        {/* Sidebar avec des boutons */}
        <Offcanvas show={showOffcanvas} onHide={() => this.setState({ showOffcanvas: false })} placement="end" className="d-md-none">
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Menu</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <div>
              {/* Barre de recherche */}
              <Nav className="mb-3">
                <Form>
                  <Form.Control 
                    type="text"
                    placeholder="Search Product"
                    onChange={(e) => {
                      this.props.changeValueSearch(e);
                    }} 
                    style={{ marginRight: '10px', backgroundColor: 'transparent', border: 'none' }} 
                  />
                  <Button variant="primary" style={{ color: '#fff' }}>Rechercher</Button>
                </Form>
              </Nav>
              {/* Copiez les mêmes éléments de navigation ici */}
              <Nav className="mb-3 d-flex flex-column">
                <Nav.Link href="#" style={{ color: '#000', fontSize: '18px', marginBottom: '10px' }}><FaHome /> Home</Nav.Link>
                <Nav.Link href="#" style={{ color: '#000', fontSize: '18px', marginBottom: '10px' }}><FaShoppingCart /> Produits</Nav.Link>
                <Nav.Link href="#" style={{ color: '#000', fontSize: '18px', marginBottom: '10px' }}><FaHome /> Service</Nav.Link>
                {/* Paramètres */}
                <Dropdown>
                  <Dropdown.Toggle variant="transparent" id="dropdown-basic" style={{ color: '#000', fontSize: '18px', marginBottom: '10px' }}>
                    <FaCog />
                    <span style={{ marginLeft: '5px' }}>Paramètres</span>
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item><FaUser /> Mon compte</Dropdown.Item>
                    <Dropdown.Item><FaCommentDots /> Demande Devis</Dropdown.Item>
                    <Dropdown.Item><FaHistory /> Historique</Dropdown.Item>
                    <Dropdown.Item><FaCalendarAlt /> Demande Rendez-vous</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item><FaSignOutAlt /> Déconnexion</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Nav>
            </div>
          </Offcanvas.Body>
        </Offcanvas>
        <Nav className="mb-3 d-none d-md-flex align-items-center justify-content-center" style={{ padding: '10px', borderRadius: '5px' }}>
          <Form>
            <Form.Control 
              type="text"
              placeholder="Rechercher"
              onChange={(e) => {
              this.props.changeValueSearch(e);}} style={{ marginRight: '10px', backgroundColor: 'transparent', border: 'none' }} />
          </Form>
          <Button onClick={this.changeSearchValue} variant="primary" style={{ color: '#fff' }}>Rechercher</Button>
        </Nav>
        <Button onClick={this.handleToggleOffcanvas} className="d-md-none" style={{ color: '#000' }}><FaBars /></Button>

      </Container>
      
    );
  }
}

export default VerticalNavbar;
