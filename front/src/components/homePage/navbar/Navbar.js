import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import "./NavbarHome.css";
import { FormattedMessage } from "react-intl";

export default function NavbarHome() {
  let services = "Services";
  if (navigator.language.startsWith("es")) {
    services = "Servicios";
  }

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" sticky="top">
      <Navbar.Brand href="#home">OMICRON</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#product" className="element--navbar-color2">
            <FormattedMessage id="landing.navbar.product" />
          </Nav.Link>
          <Nav.Link href="#about" className="element--navbar-color2">
            <FormattedMessage id="landing.navbar.about" />
          </Nav.Link>
          <NavDropdown title={services} id="collasible-nav-dropdown">
            <NavDropdown.Item href="#price">
              <FormattedMessage id="landing.navbar.prices" />
            </NavDropdown.Item>
            <NavDropdown.Item href="#us">
              <FormattedMessage id="landing.navbar.aboutus" />
            </NavDropdown.Item>
            <NavDropdown.Item href="#how">
              <FormattedMessage id="landing.navbar.howdowedoit" />
            </NavDropdown.Item>
          </NavDropdown>
          <Nav.Link href="/helpPage" className="element--navbar-color2">
            <FormattedMessage id="landing.navbar.help" />
          </Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link href="/login" className="element--navbar-color2">
            <FormattedMessage id="landing.navbar.login" />
          </Nav.Link>
          <Link
            to="/signin"
            className="btn-button btn--primary-button btn--medium-button btn--signin-decoration"
            aria-label="Signin"
          >
            <FormattedMessage id="landing.navbar.signin" />
          </Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
