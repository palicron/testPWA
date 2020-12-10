import React from "react";
import "./FailedLogin.css";
import { Button } from "../button/Button";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";

import { BsArrow90DegLeft } from "react-icons/bs";

export default function FailedLogin() {
  return (
    <main>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar.Brand href="/">
            {" "}
            <BsArrow90DegLeft /> Volver a inicio
          </Navbar.Brand>
        </Navbar>
      <div className="wrap-user-not">
        <div className="container-user-not">
          <h1>El usuario no existe</h1>
          <p>
            Parece que intentas loguearte con un usuario que no existe en
            nuestra base de datos.
          </p>
          <div className="container-failed-login">
            <div className="btn-failed-login">
              <Link to="/login" >
              <Button
                   
                    buttonColor="blue-button"
                  >Volver a intentar</Button>
              </Link>
            </div>
            <div className="btn-failed-login">
              <Link to="/signin" className="form-btn-margin">
              <Button
                   buttonColor="blue-button"
                  >Registrarse</Button>
              </Link>
            </div>
            
          </div>
        </div>
      </div>
    </main>
  );
}
