import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import "./Home.css";
import { AppContext } from "../../context/AppContext";

import CardCursos from "../cardCursos/CardCursos";
import Loading from "../loading/Loading";

export default function Curso() {
  const [data] = useContext(AppContext);

  const url_cursos = "/omicron/cursos/teacher/" + data.userId;
  const [cursos, setCursos] = useState(null);

  useEffect(() => {
    if (!navigator.onLine) {
      if (sessionStorage.getItem("Cursos") === "") {
        setCursos("Loading...");
      } else {
        setCursos(sessionStorage.getItem("Cursos"));
      }
    } else {
      axios.get(url_cursos).then((response) => {
        let dataCorr = [];
        response.data.map((curso) => {
          if (curso.infoMaterias.length !== 0) {
            curso.cantidadMaterias = curso.infoMaterias.length;
            dataCorr.push(curso);
          }
        });
        setCursos(dataCorr);
        sessionStorage.setItem("Cursos",JSON.stringify(response.data));
      });
    }
  }, [url_cursos]);


  let content = <Loading texto="Cargando cursos"></Loading>;

  if (cursos) {
    content = cursos.map((curso, index) => (
      <CardCursos
        key={index}
        id={curso._id}
        curso={curso.name}
        numMaterias={curso.cantidadMaterias}
        image={curso.image}
      ></CardCursos>
    ));
  }

  return (
    <div>
      <section id="principalSection" className="mx-3 my-3 mt-5">
        <h1 className="mb-4">Todos los cursos</h1>
        <div
          className="row row-cols-2 row-cols-lg-3 row-cols-xl-4"
          id="allCourses"
        >
          {content}
        </div>
      </section>
    </div>
  );
}
