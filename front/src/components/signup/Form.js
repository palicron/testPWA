import React from "react";
import useFormSignup from "./useForm";
import validate from "./validateInfo";
import "./FormSignUp.css";
import { FormattedMessage } from "react-intl";

export default function Form({ submitForm }) {
  const { handleChange, values, handleSubmit, errors } = useFormSignup(
    submitForm,
    validate,
  );

  return (
    <div className="section-as-signup">
      <div className="container-step-signup">
        <form className="form-signup" onSubmit={handleSubmit}>
          <div className="py-3 border-gray border-top ">
            <div className="container-grid-up bd-up">
              <div className="bd-grid-up">
                <div className="form-inputs-up">
                  {/* Username */}
                  <label htmlFor="username" className="form-label">
                    Username
                  </label>
                  <input
                    className="form-input-up"
                    type="text"
                    name="username"
                    placeholder="Enter username"
                    value={values.username}
                    onChange={handleChange}
                    id="username"
                  />
                  {errors.username && <p>{errors.username}</p>}
                </div>

                {/* First name */}
                <div className="form-inputs-up">
                  <label htmlFor="firstName" className="form-label">
                    First Name
                  </label>
                  <input
                    className="form-input-up"
                    type="text"
                    name="firstName"
                    placeholder="Enter First name"
                    value={values.firstName}
                    onChange={handleChange}
                    id="firstName"
                  />
                  {errors.firstName && <p>{errors.firstName}</p>}
                </div>

                {/* Second name */}
                <div className="form-inputs-up">
                  <label htmlFor="secondName" className="form-label">
                    Second Name
                  </label>
                  <input
                    className="form-input-up"
                    type="text"
                    name="secondName"
                    placeholder="Enter Second name"
                    value={values.secondName}
                    onChange={handleChange}
                    id="secondName"
                  />
                  {errors.secondName && <p>{errors.secondName}</p>}
                </div>

                {/* Last name */}
                <div className="form-inputs-up">
                  <label htmlFor="lastName" className="form-label">
                    Last Name
                  </label>
                  <input
                    className="form-input-up"
                    type="text"
                    name="lastName"
                    placeholder="Enter Last name"
                    value={values.lastName}
                    onChange={handleChange}
                    id="lastName"
                  />
                  {errors.lastName && <p>{errors.lastName}</p>}
                </div>

                {/* Email */}
                <div className="form-inputs-up">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    className="form-input-up"
                    type="email"
                    name="email"
                    placeholder="Enter email"
                    value={values.email}
                    onChange={handleChange}
                    id="email"
                  />
                  {errors.email && <p>{errors.email}</p>}
                </div>
              </div>
              <div className="bd-grid-up">
                {/* School */}
                <div className="form-inputs-up">
                  <label htmlFor="school" className="form-label">
                    School
                  </label>
                  <input
                    className="form-input-up"
                    type="text"
                    name="school"
                    placeholder="Enter school"
                    value={values.school}
                    onChange={handleChange}
                    id="school"
                  />
                  {errors.school && <p>{errors.school}</p>}
                </div>

                <div className="form-inputs-up">
                  <label htmlFor="rol" className="form-label">
                    Rol
                  </label>
                  <select className="width-role" name="rol" id="rol">
                    <option value="profesor">Profesor</option>
                    <option value="estudiante">Estudiante</option>
                    <option value="rector">Rector</option>
                  </select>
                </div>

                <div className="form-inputs-up">
                  <label htmlFor="phone" className="form-label">
                    Celular
                  </label>
                  <input
                    className="form-input-up"
                    type="text"
                    name="phone"
                    placeholder="Enter Phone"
                    value={values.phone}
                    onChange={handleChange}
                    id="phone"
                  />
                  {errors.phone && <p>{errors.phone}</p>}
                </div>

                {/* Password 1 */}
                <div className="form-inputs-up">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    className="form-input-up"
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    value={values.password}
                    onChange={handleChange}
                    id="password"
                  />
                  {errors.password && <p>{errors.password}</p>}
                </div>
                {/* Password 2 */}
                <div className="form-inputs-up">
                  <label htmlFor="password2" className="form-label">
                    Confirm password
                  </label>
                  <input
                    className="form-input-up"
                    type="password"
                    name="password2"
                    placeholder="Confirm your password"
                    value={values.password2}
                    onChange={handleChange}
                    id="password2"
                  />
                  {errors.password2 && <p>{errors.password2}</p>}
                </div>
              </div>
            </div>
            <div className="d-flex flex-row justify-content-center align-items-center px-3 mb-3">
              <button
                className="btn btn-secondary text-uppercase button--color-purple"
                type="submit"
              >
                <FormattedMessage id="login.register" />
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
