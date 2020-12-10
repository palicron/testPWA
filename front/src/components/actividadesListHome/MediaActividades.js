import React from "react";
import "./MediaActividades.css";
import TareaImg from "../../assets/images/icons8-task-64.png";
import { Link } from "react-router-dom";

export default function MediaActividades({
  curso,
  nombre,
  fechaVencimiento,
  image,
}) {
  let rutaImg = image;
  if (`${image}` === "") {
    rutaImg = TareaImg;
  }

  return (
    <li className="media mb-4 d-flex mediaActivities">
      <img
        src={rutaImg}
        className="align-self-center mx-3 mediaImage--size-20"
        alt={curso}
      />

      <Link to="/actividades" className="nextActivitiesRef">
        <div className="media-body py-2">
          <p className="mt-0 mb-0">
            Curso: {curso} - {nombre}
          </p>
          <span className="mb-0">{fechaVencimiento}</span>
        </div>
      </Link>
    </li>
  );
}
