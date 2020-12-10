import React from "react";
import useForm from "./useForm";
import "./Form.css";
import { Button } from "../button/Button";
import { Link } from "react-router-dom";

const FormSignIn = ({ submitForm }) => {
  const { handleChange, handleSubmit, values } = useForm(submitForm);

  return (
    <div className="section-as-signin">
      <div className="container-step-signin">
        <form onSubmit={handleSubmit} className="form" noValidate>
          <div className="py-5 border-gray border-top ">
            <div className="form-inputs">
              <label htmlFor="email" className="form-label">
                Username
              </label>
              <input
                className="form-input"
                type="text"
                name="email"
                placeholder="Ingresa el username"
                value={values.email}
                onChange={handleChange}
                id="email"
              />
            </div>
            {/** Render the password field component using thresholdLength of 7 and minStrength of 3 **/}
            <div className="form-inputs">
              <label htmlFor="password" className="form-label">
                Contraseña
              </label>
              <input
                className="form-input"
                type="password"
                name="password"
                placeholder="Ingresa tu contraseña"
                value={values.password}
                onChange={handleChange}
                id="password"
              />
            </div>
          </div>
          <div className="d-flex flex-row justify-content-center align-items-center px-3 mb-3">
          <button className="btn btn-primary text-uppercase" type="submit">
            Ingresar
          </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormSignIn;
