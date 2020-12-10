import React from "react";
import "./Header.css";
import { Button } from "../../button/Button";
import { Link } from "react-router-dom";
import Typical from "react-typical";
import { FormattedMessage } from "react-intl";

export default function Header() {
  let dataSteps = ["in order", "with statistics", "easily"];

  if (navigator.language.startsWith("es")) {
    dataSteps = ["ordenadas", "con estadísticas", "fácilmente"];
  }

  return (
    <>
      <div className="header-as" id="home">
        <section className="bd-grid-as-header-sec description-as-header-sec">
          <div>
            <div className="text-as-header-sec">
              <h1 className="font-tittle-header">
                <FormattedMessage id="landing.header.title1" />
                <Typical
                  className="font-tittle-header"
                  loop={Infinity}
                  wrap="b"
                  steps={[
                    dataSteps[0],
                    1000,
                    dataSteps[1],
                    1000,
                    dataSteps[2],
                    1000,
                  ]}
                />
              </h1>
            </div>
            <div className="container-img-subt-header-sec">
              <div></div>
              <div className="container-text-header-sec">
                <div>
                  <p className="header__text-as-sec font-size-as-small">
                    <FormattedMessage id="landing.header.title2" />
                  </p>
                  <div className="button-center-sec">
                    <Link to="/signin">
                      <Button
                        buttonSize="btn--wide-button"
                        buttonColor="white-button"
                      >
                        <FormattedMessage id="landing.navbar.signin" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="img-header-container-sec-e"></div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
