import React from 'react'
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import {
    BsArrow90DegLeft
 } from "react-icons/bs"

export default function NavbarHelp() {
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="/"> <BsArrow90DegLeft/> Volver a inicio</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            
          </Nav>
          <Nav>
            <Nav.Link href="/login">Log in</Nav.Link>
            <Nav.Link eventKey={2} href="/signup">
              Sign In 
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
}
