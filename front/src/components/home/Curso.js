import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import "./Home.css";
import { AppContext } from "../../context/AppContext";

import CardCursos from "../cardCursos/CardCursos";
import Loading from "../loading/Loading";
import { FormattedMessage } from "react-intl";

export default function Curso() {
  const [dataC] = useContext(AppContext);

  const url_cursos = "/omicron/cursos/teacher/" + dataC.userId;
  const [cursos, setCursos] = useState(null);

  let loadingCourses = "Loading courses";
  if (navigator.language.startsWith("es")) {
    loadingCourses = "Cargando cursos";
  }
  useEffect(() => {
    if (!navigator.onLine) {
      if (sessionStorage.getItem("Cursos") === "") {
        setCursos("Loading...");
      } else {
        setCursos(JSON.parse(sessionStorage.getItem("Cursos")));
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
        sessionStorage.setItem("Cursos", JSON.stringify(dataCorr));
      });
    }
  }, [url_cursos]);

  let content = <Loading texto={loadingCourses}></Loading>;

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
        <h1 className="mb-4">
          <FormattedMessage id="home.courses" />
        </h1>
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
