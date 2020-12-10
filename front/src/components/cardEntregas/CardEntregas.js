import React, { useState } from "react";
import Tooltip from "@material-ui/core/Tooltip";
import "./CardEntregas.css";
import Student from "../../assets/images/student.png";
import Alert from "../../assets/images/alert.png";
import { Link } from "react-router-dom";
export default function CardEntregas({ nombre, fecha, calificado, link }) {
  return (
    <div className="col-md-4 col-sm-6 col-lg-3 py-3 tarjeta">
      <div className="card card-entregas">
        <div className="card-body card-body-entregas">
          <img src={Student}></img>
          <div className="card-title">
            {nombre}
            {calificado ? (
              <p></p>
            ) : (
              <Tooltip
                className="tooltip-entregas"
                title="Necesita calificación"
                placement="right-start"
                arrow
              >
                <img
                  className="tooltip-entregas"
                  src={Alert}
                  width="25px"
                  data-toggle="tooltip"
                  data-placement="right"
                  title=""
                  data-original-title="Necesita calificación"
                ></img>
              </Tooltip>
            )}
          </div>
          <p className="card-text text-muted">{fecha}</p>
          <Link
            to="/actividades/entregas/calificaciones"
            className="btn btn-primary btn-primary-entregas"
          >
            Calificar
          </Link>
        </div>
      </div>
    </div>
  );
}
