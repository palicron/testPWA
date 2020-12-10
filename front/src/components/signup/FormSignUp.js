import React from "react";
import JoinForm from "./JoinForm";
import "./FormSignUp.css";
import SuccessForm from "./SuccessForm";
import Navbar from "react-bootstrap/Navbar";
import { BsArrow90DegLeft } from "react-icons/bs";

export default function FormSignUp() {
  return (
    <main>
      <div>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar.Brand href="/">
            {" "}
            <BsArrow90DegLeft /> Volver a inicio
          </Navbar.Brand>
        </Navbar>
        <div className="container-signup">
          <h1 className="text-form-signup">Registrate en Omicromio</h1>
          <JoinForm />
        </div>
      </div>
    </main>
  );
}
