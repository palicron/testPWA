import React from "react";
import "./Footer.css";
import { FiYoutube, FiInstagram, FiTwitter, FiLinkedin } from "react-icons/fi";
import { FormattedMessage } from "react-intl";

function Footer() {
  return (
    <>
      <footer className="footer-as">
        <div className="footer-container-as">
          <div>
            <h2 className="footer__logo-as"> OMICRON </h2>
          </div>
          <div>
            <h2 className="footer__title-as">
              <FormattedMessage id="landing.footer.about.title" />
            </h2>
            <p>
              <FormattedMessage id="landing.footer.about.contact.option" />
            </p>
            <p>
              <FormattedMessage id="landing.footer.about.support.option" />
            </p>
          </div>
          <div>
            <h2 className="footer__title-as">
              <FormattedMessage id="landing.footer.product.title" />
            </h2>
            <p></p>
            <p>
              <FormattedMessage id="landing.footer.product.omicromio.option" />
            </p>
          </div>
          <div>
            <h2 className="footer__title-as">
              <FormattedMessage id="landing.footer.price.title" />
            </h2>
            <p>
              <FormattedMessage id="landing.footer.price.prices.option" />
            </p>
            <p>
              <FormattedMessage id="landing.footer.price.salescontact.option" />
            </p>
          </div>
        </div>
        <div className="container__footer">
          <div className="social-icons-footer-as">
            <FiInstagram size={25} />
          </div>
          <div className="social-icons-footer-as">
            <FiTwitter size={25} />
          </div>
          <div className="social-icons-footer-as">
            <FiYoutube size={25} />
          </div>
          <div className="social-icons-footer-as">
            <FiLinkedin size={25} />
          </div>
        </div>
        <div>
          <p>
            Copyright &#169; 2020 Omicron |{" "}
            <FormattedMessage id="landing.footer.rights" />
          </p>
        </div>
      </footer>
    </>
  );
}

export default Footer;
