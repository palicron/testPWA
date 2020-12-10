import React, { useContext } from "react";
import styles from "./CardCursos.module.css";
import { Link } from "react-router-dom";
import { AppContext } from "../../context/AppContext";

export default function CardCursos({ id, curso, numMaterias, image }) {
  const [data, setData] = useContext(AppContext);

  let textMaterias = " materia";
  textMaterias = numMaterias > 1 ? textMaterias + "s" : textMaterias;

  function handleClick() {
    setData({ ...data, idCourse: id, nameCourse: curso });
  }

  return (
    <div className="col mb-4">
      <Link to="/materias" onClick={handleClick}>
        <div
          className={
            "card h-100 " + styles.cardCurso + " " + styles.cardCursitoo
          }
        >
          <img src={image} className="card-img-top" alt={curso}></img>
          <div
            className={
              "card-body " +
              styles.cardCursoBody +
              " " +
              styles.cardCursoBodyHover
            }
          >
            <h2 className="card-title">{curso}</h2>
            <p className="card-text">
              {numMaterias} {textMaterias}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}
