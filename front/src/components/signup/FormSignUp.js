import React, { useEffect, useState, useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { useHistory } from "react-router-dom";
import "./FormSignUp.css";
import Navbar from "react-bootstrap/Navbar";
import { BsArrow90DegLeft } from "react-icons/bs";
import { FormattedMessage } from "react-intl";
import Form from "./Form";
import SignIn from "../signin/Form";

export default function FormSignUp() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const history = useHistory();
  function submitForm() {
    setIsSubmitted(true);
  }

  return (
    <main>
      <div>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar.Brand href="/">
            <BsArrow90DegLeft /> <FormattedMessage id="landing.navbar.home" />
          </Navbar.Brand>
        </Navbar>
        <div className="container-signup">
          <h1 className="text-form-signup">
            <FormattedMessage id="sign.up.title" />
          </h1>
          <Form submitForm={submitForm} />
        </div>
      </div>
    </main>
  );
}
