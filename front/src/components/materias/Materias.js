import React, { useState, useEffect, useRef, useContext } from "react";
import "./Materias.css";
import CardMaterias from "../cardMaterias/CardMaterias";
import axios from "axios";
import { AppContext } from "../../context/AppContext";
import Loading from "../loading/Loading";
import { Link } from "react-router-dom";

export default function Materias(props) {
  const [data] = useContext(AppContext);
  console.log(data);

  const url =
    "/omicron/materias/teacher/" + data.userId + "/course/" + data.idCourse;

  const [materias, setMaterias] = useState(null);

  useEffect(() => {

    if (!navigator.onLine) {
      if (sessionStorage.getItem("Materias") === "") {
        setMaterias("Loading...");
      } else {
        setMaterias(sessionStorage.getItem("Materias"));
      }
    } else {
    axios
      .get(url)
      .then((response) => {
        // Obtenemos los datos
        console.log(response);
        setMaterias(response.data);
        sessionStorage.setItem("Materias",JSON.stringify(response.data));
      })
      .catch((e) => {
        // Capturamos los errores
        console.log(e);
      });
     
    }
  }, [url]);

  const content = useRef(null);
  const iconHome = useRef(null);
  const onsideBarCollapseClick = () => {
    content.current.classList.toggle("active");
    iconHome.current.classList.toggle("transformed180Right");
    props.collapseNavbar();
  };

  return (
    <main>
      <div className="page-content p-2" id="content" ref={content}>
        <div>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/home" className="breadcrumb-item-color">Home</Link>
              </li>
              <li className="breadcrumb-item breadcrumb-item-coloractive" aria-current="page">
                Materias
              </li>
            </ol>
          </nav>
        </div>
        <div className="container-fluid">
          <section className="mx-3">
            <div className="col-12">
              <div className="row materias container-fluid rounded">
                <div className="col-lg-12 col-md-12 bottomMargin">
                  <h1 className="mt-3">Mis materias</h1>
                </div>

                {materias == null ? (
                  <Loading texto="Cargando materias..."></Loading>
                ) : (
                  materias.map((materia, index) => (
                    <CardMaterias
                      key={index}
                      id={materia._id}
                      materia={materia.name}
                    ></CardMaterias>
                  ))
                )}
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
