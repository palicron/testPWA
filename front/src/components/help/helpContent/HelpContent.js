import React from "react";
import "./HelpContent.css";
import { FormattedMessage } from "react-intl";

export default function HelpContent() {
  return (
    <main>
      <section className="container-help-page">
        <div className="bd-grid-as-help description-as-help-sec">
          <div className="container-tittle-help-page">
            <h1 className="text-help-center">
              <FormattedMessage id="help.main.title" />
            </h1>
          </div>
          <div className="container-description-help-page">
            <p>
              <FormattedMessage id="help.main.description" />
            </p>
          </div>
          <div className="container-section-help-page">
            <h2 className="subtext-help-center">
            <FormattedMessage id="help.main.register.title" />
              
            </h2>
            <hr />
            <p>
            <FormattedMessage id="help.main.register.description" />
            </p>
          </div>
          <div className="container-section-help-page">
            <h2 className="subtext-help-center">
              <FormattedMessage id="help.main.teacher.title"/>
            </h2>
            <hr />
            <p>
            <FormattedMessage id="help.main.teacher.description"/>
            </p>
          </div>
          <div className="container-section-help-page">
            <h2 className="subtext-help-center">
            <FormattedMessage id = "help.main.cellphone.title"/ >
            </h2>
            <hr />
            <p>
            <FormattedMessage id="help.main.cellphone.description"/>
            </p>
          </div>
          <div className="container-section-help-page">
            <h2 className="subtext-help-center">
              <FormattedMessage id = "help.main.activities.title"/>
            </h2>
            <hr />
            <p>
            <FormattedMessage id = "help.main.activities.description"/>
         
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
