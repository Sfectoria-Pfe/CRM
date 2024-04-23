import React, { useState } from "react";
import { Nav, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import image from"../../images/Logo maisonplus.png"
const Header = ({ user }) => {
  const [navList, setNavList] = useState(false);

  return (
    <>
      <header className="header">
        <div className="container flex" >
          <div className="logo">
            <img style={{width:"100px"}}
            src={image}
              alt="logo"
            />
          </div>
          <div className="nav">
            <Nav className={navList ? "small" : "flex"}>
              <Nav.Link as={Link} to="/" className="nav-link">
                <span>Home</span>
              </Nav.Link>
              <Nav.Link as={Link} to="/about" className="nav-link">
                <span>About</span>
              </Nav.Link>
              <Nav.Link as={Link} to="/services" className="nav-link">
                <span>Services</span>
              </Nav.Link>
              <Nav.Link as={Link} to="/packs" className="nav-link">
                <span>Pack</span>
              </Nav.Link>
              <Nav.Link as={Link} to={user?"/Demandedevis":'LoginForm'} className="nav-link">
                <span>Demande devis</span>
              </Nav.Link>
              <Nav.Link as={Link} to={user?"/rendez-vous":'LoginForm'} className="nav-link">
                <span>Demande rendez-vous</span>
              </Nav.Link>
            </Nav>
          </div>
          <div className="button flex">
            {user ? (
              <Dropdown className="d-flex ">
                <Dropdown.Toggle
                  variant=""
                  id="dropdownMenu2"
                  className="d-flex gap-3 align-items-center"
                >
                  <img
                    src={user?.Client?.image}
                    alt="avatar"
                    className="rounded-circle"
                    style={{ width: 50, height: 50, objectFit: "cover" }}
                  />
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => {
                      
                      window.location.pathname = "/profile";
                    }}>Profile</Dropdown.Item>
                  <Dropdown.Item onClick={() => {
                      
                      window.location.pathname = "/historique";}}>Historique</Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => {
                      localStorage.removeItem("token");
                      window.location.pathname = "/";
                    }}
                  >
                    Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <Link to="LoginForm" className="btn1">
                <i className="fa fa-sign-out"></i> se connecter
              </Link>
            )}
          </div>
          <div className="toggle">
            <button onClick={() => setNavList(!navList)}>
              {navList ? (
                <i className="fa fa-times"></i>
              ) : (
                <i className="fa fa-bars"></i>
              )}
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
