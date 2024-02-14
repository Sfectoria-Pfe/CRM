import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';

function OffcanvasExample() {
  return (
    <Navbar bg="bg-body-tertiary" expand="lg" fixed="top" className="mb-3">
      <Container fluid>
        <Navbar.Brand href="#">Mon Compte</Navbar.Brand>
        <Navbar.Toggle aria-controls="offcanvasNavbar" />
        <Navbar.Offcanvas
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id="offcanvasNavbarLabel">Menu</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3">
              <Nav.Link href="#">Mon Compte</Nav.Link>
              <Nav.Link href="#">Demande de Devis</Nav.Link>
              <Nav.Link href="#">Historique</Nav.Link>
              <NavDropdown title="Consulter les Produits" id="offcanvasNavbarDropdown">
                <NavDropdown.Item href="#">Tous les Produits</NavDropdown.Item>
                <NavDropdown.Item href="#">Mes Produits Favoris</NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Form className="d-flex">
              <Form.Control type="search" placeholder="Rechercher" className="me-2" aria-label="Search" />
              <Button variant="outline-success">Rechercher</Button>
            </Form>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}

export default OffcanvasExample;
