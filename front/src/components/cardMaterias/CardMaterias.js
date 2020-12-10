import React, { useState, useContext } from "react";
import "./CardMaterias.css";
import { Link } from "react-router-dom";
import { AppContext } from "../../context/AppContext";

export default function CardMaterias({ id, materia }) {
  const [data, setData] = useContext(AppContext);

  function handleClick() {
    setData({ ...data, idMateria: id, nameMateria: materia });
  }

  return (
    <div className="col-lg-4 col-md-6 col-sm-12 materia">
      <div className="shadow-lg p-3 mb-5 bg-white rounded">
        <svg
          width="150px"
          height="150px"
          viewBox="0 0 16 16"
          className="bi bi-book-fill"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z"
          ></path>
        </svg>
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
