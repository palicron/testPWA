import React from "react";
import "./FailedLogin.css";
import { Button } from "../button/Button";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import { FormattedMessage } from "react-intl";

import { BsArrow90DegLeft } from "react-icons/bs";

export default function FailedLogin() {
  return (
    <main>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar.Brand href="/">
            <BsArrow90DegLeft /> <FormattedMessage id="landing.navbar.home"/>
          </Navbar.Brand>
        </Navbar>
      <div className="wrap-user-not">
        <div className="container-user-not">
          <h1><FormattedMessage id="login.failed.main.title"/></h1>
          <p>
          <FormattedMessage id="login.failed.main.description"/>
          </p>
          <div className="container-failed-login">
            <div className="btn-failed-login">
              <Link to="/login" >
              <Button
                   
                    buttonColor="blue-button"
                  ><FormattedMessage id="login.failed.main.try.again"/></Button>
              </Link>
            </div>
            <div className="btn-failed-login">
              <Link to="/signin" className="form-btn-margin">
              <Button
                   buttonColor="blue-button"
                  ><FormattedMessage id="login.register"/></Button>
              </Link>
            </div>
            
          </div>
        </div>
      </div>
    </main>
  );
}
