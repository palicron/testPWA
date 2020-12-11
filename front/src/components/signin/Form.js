import React, { useState } from "react";
import FormSignIn from "./FormSignIn";
import { BsArrow90DegLeft } from "react-icons/bs";
import Navbar from "react-bootstrap/Navbar";
import "./Form.css";
import { FormattedMessage } from "react-intl";

const Form = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  function submitForm() {
    setIsSubmitted(true);
  }
  return (
    <main>
      <div>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar.Brand href="/">
            {" "}
            <BsArrow90DegLeft />
            <FormattedMessage id="landing.navbar.home" />
          </Navbar.Brand>
        </Navbar>
        <div className="container-signin">
            <h1 className="text-form-signin">
              <FormattedMessage id="login.main.title" />
            </h1>
            <FormSignIn submitForm={submitForm} />
          </div>
        </div>
    </main>
  );
};

export default Form;
