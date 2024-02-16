import React, { useState } from 'react';
import React, { useState } from 'react';
import { Container, Nav, Button, Offcanvas, Form, NavDropdown } from 'react-bootstrap'; 
import { FaHome, FaShoppingCart, FaClipboardList, FaFileAlt, FaHistory, FaSearch } from 'react-icons/fa';

function VerticalNavbar() {
  const [showOffcanvas, setShowOffcanvas] = useState(false);

  const handleToggleOffcanvas = () => setShowOffcanvas(!showOffcanvas);

  return (
    <Container fluid>
      {/* Barre de navigation principale avec des liens */}
      <Nav className="mb-3 d-none d-md-flex align-items-center">
        <Nav.Item className="me-3">
          <Nav.Link href="#"><FaHome /> Home</Nav.Link>
        </Nav.Item>
        <Nav.Item className="me-3">
          <Nav.Link href="#"><FaShoppingCart /> produit</Nav.Link>
        </Nav.Item>
        <Nav.Item className="me-3">
          <Nav.Link href="#"><FaClipboardList /> service</Nav.Link>
        </Nav.Item>
        <Nav.Item className="me-3">
          <NavDropdown title={<div><FaFileAlt /> consulter</div>} align="end">
            <NavDropdown.Item><FaFileAlt /> demande devis</NavDropdown.Item>
            <NavDropdown.Item><FaHistory /> historique client</NavDropdown.Item>
            <NavDropdown.Divider />
          </NavDropdown>
        </Nav.Item>
      </Nav>
      
      {/* Bouton pour afficher la sidebar sur les appareils mobiles */}
      <Button onClick={handleToggleOffcanvas} className="d-md-none">Afficher</Button>
      
      {/* Sidebar avec des boutons */}
      <Offcanvas show={showOffcanvas} onHide={() => setShowOffcanvas(false)} placement="end" className="d-md-none">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>client</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="d-grid gap-2">
            <Button variant="primary" size="lg" className="mb-2"><FaHome /> Home</Button>
            <Button variant="primary" size="lg" className="mb-2"><FaShoppingCart /> produit</Button>
            <Button variant="primary" size="lg" className="mb-2"><FaClipboardList /> service</Button>
            <NavDropdown title={<div><FaFileAlt /> consulter</div>}>
              <NavDropdown.Item><FaFileAlt /> demande devis</NavDropdown.Item>
              <NavDropdown.Item><FaHistory /> historique client</NavDropdown.Item>
              <NavDropdown.Divider />
            </NavDropdown>
            <Form className="mb-3">
              <Form.Control type="search" placeholder="Search" />
            </Form>
            <Button variant="success" size="lg"><FaSearch /> Search</Button>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </Container>
  );
}

export default VerticalNavbar;
