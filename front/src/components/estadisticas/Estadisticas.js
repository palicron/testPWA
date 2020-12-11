import axios from "axios";
import React, { useState, useEffect } from "react";
import infoImg from "../../assets/images/icons8-información-64.png";
import PieChartEstadisticas from "../pieChartEstadisticas/PieChartEstadisticas";
import { Link } from "react-router-dom";
import Loading from "../loading/Loading";

export default function Estadisticas() {
  const url_estadísticas = "http://localhost:3001/omicron/estadisticas";
  const [estadisticas, setEstadisticas] = useState(null);

  useEffect(() => {

    if (!navigator.onLine) {
      if (sessionStorage.getItem("Estadisticas") === "") {
        setEstadisticas("Loading...");
      } else {
        setEstadisticas(JSON.parse(sessionStorage.getItem("Estadisticas")));
      }
    } else { 
    axios.get(url_estadísticas).then((response) => {
      console.log(response);

      setEstadisticas(response.data);
      sessionStorage.setItem("Cursos",JSON.stringify(response.data));
    });

  }
  }, [url_estadísticas]);

  let content = "No hay estadísticas disponibles.";

  let data = [];
  let cont;

  if (estadisticas) {
    content = estadisticas.map((estadistica) =>
      estadistica.cantidades.map((cantidad) => {
        cont = cont + 1;
        data[cont] = cantidad;
      }),
    );
  }

  return (
    <main>
      <div className="page-content p-2" id="content">
        <button
          id="sidebarCollapseBtn"
          type="button"
          className="btn btn-light bg-white rounded-pill shadow-sm px-4 mb-4"
        >
          <i
            className="fa fa-chevron-right mr-2 transformed180Left"
            id="rotateIconMenu"
          ></i>
          <small className="text-uppercase font-weight-bold">Menu</small>
        </button>
        <div>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/home" className="breadcrumb-item-color">Home</Link>
              </li>
              <li className="breadcrumb-item breadcrumb-item-coloractive" aria-current="page">
                Estadísticas
              </li>
            </ol>
          </nav>
        </div>
        <div>
            {estadisticas === null ? (
              <Loading texto="Cargando estadisticas..."></Loading>
            ) : (
        <div className="container-fluid">
          <hr />
          <h2 className="txt-muted">Estadisticas</h2>
          <hr />
          <div className="row text-center">
            <div className="col">
              <span
                data-toggle="tooltip"
                title="Aquí puede ver el porcentaje de las actividades que han tenido su nota promedio en cierto rango."
              >
                <img
                  src={infoImg}
                  alt="info"
                  className="mr-3 icon-width-30px"
                />
              </span>
              <strong>Nota promedio</strong>
              <br/>
              3.68
              <div
                className="h-100 d-flex justify-content-center align-items-center"
                id="pie-actividades-nota"
              >
                <PieChartEstadisticas
                  param1={"Superior"}
                  param2={"Alto"}
                  param3={"Básico"}
                  param4={"Bajo"}
                  data1={data[0]}
                  data2={data[1]}
                  data3={data[2]}
                  data4={data[3]}
                  nombre={"Nivel"}
                  categoria={"Actividades"}
                ></PieChartEstadisticas>
              </div>
            </div>
            <div className="col">
              <span
                data-toggle="tooltip"
                title="Aquí puede ver el porcentaje de las actividades que han tenido cierto porcentaje de entregas."
              >
                <img
                  src={infoImg}
                  alt="info"
                  className="mr-3 icon-width-30px"
                />
              </span>
              <strong>Cantidad de entregas</strong>
              <div
                className="h-100 d-flex justify-content-center align-items-center"
                id="pie-actividades-entregados"
              >
                <PieChartEstadisticas
                  param1={"Completo"}
                  param2={"Más de la mitad"}
                  param3={"Menos de la mitad"}
                  param4={"Sin entregas"}
                  data1={3}
                  data2={0}
                  data3={0}
                  data4={34}
                  nombre={"Completitud"}
                  categoria={"Actividades calificadas"}
                ></PieChartEstadisticas>
              </div>
            </div>
            <div className="col">
              <span
                data-toggle="tooltip"
                title="Aquí puede ver el porcentaje de las actividades que han tenido cierto porcentaje de completitud en la calificación."
              >
                <img
                  src={infoImg}
                  alt="info"
                  className="mr-3 icon-width-30px"
                />
              </span>
              <strong>Cantidad de entregas calificadas</strong>
              <div
                className="h-100 d-flex justify-content-center align-items-center"
                id="pie-actividades-calificadas"
              >
                <PieChartEstadisticas
                  param1={"Completo"}
                  param2={"Más de la mitad"}
                  param3={"Menos de la mitad"}
                  param4={"Sin calificaciones"}
                  data1={3}
                  data2={0}
                  data3={0}
                  data4={0}
                  nombre={"Completitud"}
                  categoria={"Actividades calificadas"}
                ></PieChartEstadisticas>
              </div>
            </div>
          </div>
          </div>
            )}
        </div>
      </div>
    </main>
  );
}
