import React, { useState } from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const Header = ({ user }) => {
  const [navList, setNavList] = useState(false);

  return (
    <>
      <header className="header">
        <div className="container flex">
          <div className="logo">
            <img
                src="data:image/png;base64,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"
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
              <Nav.Link as={Link} to="/blog" className="nav-link">
                <span>Blog</span>
              </Nav.Link>
              <Nav.Link as={Link} to="/Demandedevis" className="nav-link">
                <span>Demande devis</span>
              </Nav.Link>
              <Nav.Link as={Link} to="/rendez-vous" className="nav-link">
                <span>Demande rendez-vous</span>
              </Nav.Link>
            </Nav>
          </div>
          <div className="button flex">
            {user ? (
              <img src={user.profileImage} alt="profile" className="profile-image" />
            ) : (
              <Link to="LoginForm" className="btn1">
                <i className="fa fa-sign-out"></i> se connecter
              </Link>
            )}
          </div>
          <div className="toggle">
            <button onClick={() => setNavList(!navList)}>
              {navList ? <i className="fa fa-times"></i> : <i className="fa fa-bars"></i>}
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
