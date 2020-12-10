import React from "react";

import { Link } from "react-router-dom";

export default function SuccessForm() {
  return (
    <div className="section-as-signup">
      <div className="container-step-signup">
        <h2>Creación exitosa </h2>
        <div className="btn-center-sign">
          <div className="btn-primary-form-succes">
            <Link to="/home" className="btn-success-as">COMENZAR</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
