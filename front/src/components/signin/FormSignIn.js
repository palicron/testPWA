import React from "react";
import useForm from "./useForm";
import "./Form.css";
import { FormattedMessage } from "react-intl";

const FormSignIn = ({ submitForm }) => {
  const { handleChange, handleSubmit, values } = useForm(submitForm);

  let enterUsername = "Enter username";
  let enterPassword = "Enter password";
  if (navigator.language.startsWith("es")) {
    enterUsername = "Ingresa tu usuario";
    enterPassword = "Ingresa tu contraseña";
  }

  return (
    <div className="section-as-signin">
      <div className="container-step-signin">
        <form onSubmit={handleSubmit} className="form" noValidate>
          <div className="py-5 border-gray border-top ">
            <div className="form-inputs">
              <label htmlFor="email" className="form-label">
                <FormattedMessage id="login.main.username" />
              </label>
              <input
                className="form-input"
                type="text"
                name="email"
                placeholder={enterUsername}
                value={values.email}
                onChange={handleChange}
                id="email"
              />
            </div>
            {/** Render the password field component using thresholdLength of 7 and minStrength of 3 **/}
            <div className="form-inputs">
              <label htmlFor="password" className="form-label">
                <FormattedMessage id="login.main.password" />
              </label>
              <input
                className="form-input"
                type="password"
                name="password"
                placeholder={enterPassword}
                value={values.password}
                onChange={handleChange}
                id="password"
              />
            </div>
          </div>

          <div className="d-flex flex-row justify-content-center align-items-center px-3 mb-3">
            <button
              className="btn btn-secondary text-uppercase button--color-purple"
              type="submit"
            >
              <FormattedMessage id="login.main.login" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormSignIn;
