import React, { useState, useContext } from "react";
import "./CardMaterias.css";
import { Link } from "react-router-dom";
import { AppContext } from "../../context/AppContext";

export default function CardMaterias({ id, materia, imgMateria }) {
  const [data, setData] = useContext(AppContext);

  function handleClick() {
    setData({
      ...data,
      idMateria: id,
      nameMateria: materia,
    });
  }

  return (
    <div className="col-lg-4 col-md-6 col-sm-12 materia">
      <div className="shadow-lg p-3 mb-5 bg-white rounded">
        <img className="img--fixed" src={imgMateria} />
      </div>
      <Link
        to="/actividades"
        id={materia}
        className="btn btn-secondary boton_Card_Materia"
        onClick={handleClick}
      >
        {materia}
      </Link>
    </div>
  );
}
