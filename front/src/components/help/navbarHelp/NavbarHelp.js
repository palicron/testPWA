import React from 'react'
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { FormattedMessage } from "react-intl";

import {
    BsArrow90DegLeft
 } from "react-icons/bs"

export default function NavbarHelp() {
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="/"> <BsArrow90DegLeft/> 
        <FormattedMessage id ="landing.navbar.home"/>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            
          </Nav>
          <Nav>
            <Nav.Link href="/login">
              <FormattedMessage id="landing.navbar.login"/>
              </Nav.Link>
            <Nav.Link eventKey={2} href="/signup">
            <FormattedMessage id="landing.navbar.signin"/>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
}
