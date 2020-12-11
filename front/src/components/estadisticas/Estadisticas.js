import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import infoImg from "../../assets/images/icons8-información-64.png";

import PieChartEstadisticas from "../pieChartEstadisticas/PieChartEstadisticas";
import Dropdown from 'react-bootstrap/Dropdown'
import { AppContext } from "../../context/AppContext";
import { Link } from "react-router-dom";
import Loading from "../loading/Loading";
import { FormattedMessage } from "react-intl";

export default function Estadisticas() {
  const [periodoTxt, setPeriodoTxt] = useState("Primer Periodo");
  const [periodo, setPeriodo] = useState(1);
  const [cursoTxt, setCursoTxt] = useState("Seleccione un curso");
  const [curso, setCurso] = useState(null);
  const [cursos, setCursos] = useState([]);
  const [materiaTxt, setMateriaTxt] = useState("Seleccione una materia");
  const [materias, setMaterias] = useState([]);
  const [dataGeneral, setDataGeneral] = useContext(AppContext);
  const [estadisticas, setEstadisticas] = useState("/1");
  const [data, setData] = useState([]);
  const url_prefijo = "/omicron/estadisticas/" + dataGeneral.userId;
  const url_cursos = "/omicron/cursos/teacher/" + dataGeneral.userId;
  const url_materiasPrefijo = "/omicron/materias/teacher/" + dataGeneral.userId + "/course";

  let loadingStatistics="Loading statistics"
  if(navigator.language.startsWith('es')){
    loadingStatistics="Cargando estadísticas"
  }
  
  useEffect(() => {
    if (!navigator.onLine) {
      if (sessionStorage.getItem("datosStat") === "") {
        setData("Loading...");
      } else {
        setData(JSON.parse(sessionStorage.getItem("datosStat")));
      }
    } else {
    setData([]);
    axios.get(url_prefijo + estadisticas).then((response) => {
      let datos = [];
      response.data.forEach((estadistica) => {
          estadistica.cantidades.forEach(cantidad => {
          datos.push(cantidad);
        })
      })
      setData(datos);
      sessionStorage.setItem("datosStat", JSON.stringify(datos));
    });
  }
  }, [estadisticas]);

  useEffect(() => {
    if (!navigator.onLine) {
      if (sessionStorage.getItem("cursoStat") === "") {
        setCursos("Loading...");
      } else {
        setCursos(JSON.parse(sessionStorage.getItem("cursoStat")));
      }
    } else {
    axios.get(url_cursos).then((response) => {
      let dataCursos = [];
      response.data.forEach(curso => {
        dataCursos.push(curso);
      })
      setCursos(dataCursos);
      sessionStorage.setItem("cursoStat", JSON.stringify(dataCursos));
    })
    } 
  }, []);

  useEffect(() => {
    if (!navigator.onLine) {
      if (sessionStorage.getItem("matStat") === "") {
        setMaterias("Loading...");
      } else {
        setMaterias(JSON.parse(sessionStorage.getItem("matStat")));
      }
    } else {
    if (curso != null) {
      axios.get(url_materiasPrefijo + "/" + curso).then((response) => {
        let dataMaterias = [];
        response.data.forEach(materia => {
          dataMaterias.push(materia);
        })
        setMaterias(dataMaterias);
        sessionStorage.setItem("matStat", JSON.stringify(dataMaterias));
      })
    }
  }
  }, [curso]);

  function changePeriod(periodTxt, periodNum){
    setPeriodo(periodNum);
    setPeriodoTxt(periodTxt + " periodo");
    setEstadisticas("/" + periodNum);
    setCursoTxt("Seleccione un curso");
    setCurso(null);
  }

  function changeCourse(course) {
    setCursoTxt(course.name);
    setCurso(course._id);
    setEstadisticas("/" + periodo + "/" + course._id);
    setMateriaTxt("Seleccione una materia")
  }

  function changeSubject(subject) {
    setMateriaTxt(subject.name);
    setEstadisticas("/" + periodo + "/" + curso + "/" + subject._id);
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
                <FormattedMessage id="statistics"/>
              </li>
            </ol>
          </nav>
        </div>
        <div>
            {data === [] ? (
              <Loading texto={loadingStatistics}></Loading>
            ) : (
        <div>
        <div className="d-flex container-fluid">
          <Dropdown>
            <Dropdown.Toggle id="dropdown-basic">
            {periodoTxt}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={()=> changePeriod("Primer", 1)}>Primer periodo</Dropdown.Item>
              <Dropdown.Item onClick={()=> changePeriod("Segundo", 2)}>Segundo periodo</Dropdown.Item>
              <Dropdown.Item onClick={()=> changePeriod("Tercer", 3)}>Tercer periodo</Dropdown.Item>
              <Dropdown.Item onClick={()=> changePeriod("Cuarto", 4)}>Cuarto periodo</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown className = "mx-3">
            <Dropdown.Toggle id="dropdown-cursos">
            {cursoTxt}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {cursos.map((item) => (
                <Dropdown.Item onClick={()=> changeCourse(item)}>{item.name}</Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown>
            <Dropdown.Toggle id="dropdown-materias">
            {materiaTxt}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {materias.map((item) => (
                <Dropdown.Item onClick={()=> changeSubject(item)}>{item.name}</Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>

        </div>
        <div className="container-fluid">
          <hr />
          <h2 className="txt-muted">Actividades</h2>
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
              <strong><FormattedMessage id="statistics.submmit.quantity"/></strong>
              <div
                className="h-100 d-flex justify-content-center align-items-center"
                id="pie-actividades-entregados"
              >
                <PieChartEstadisticas
                  param1={"Completo"}
                  param2={"Más de la mitad"}
                  param3={"Menos de la mitad"}
                  param4={"Sin entregas"}
                  data1={data[4]}
                  data2={data[5]}
                  data3={data[6]}
                  data4={data[7]}
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
                  data1={data[8]}
                  data2={data[9]}
                  data3={data[10]}
                  data4={data[11]}
                  nombre={"Completitud"}
                  categoria={"Actividades calificadas"}
                ></PieChartEstadisticas>
              </div>
            </div>
          </div>
          <hr />
          <h2 className="txt-muted">Estudiantes</h2>
          <hr />
          <div className="row text-center">
            <div className="col">
              <span
                data-toggle="tooltip"
                title="Aquí puede ver el porcentaje de estudiantes que tienen la nota promedio de la materia seleccionada en cierto rango."
              >
                <img
                  src={infoImg}
                  alt="info"
                  className="mr-3 icon-width-30px"
                />
              </span>
              <strong>Nota promedio</strong>
              <div
                className="h-100 d-flex justify-content-center align-items-center"
                id="pie-actividades-nota"
              >
                <PieChartEstadisticas
                  param1={"Superior"}
                  param2={"Alto"}
                  param3={"Básico"}
                  param4={"Bajo"}
                  data1={data[12]}
                  data2={data[13]}
                  data3={data[14]}
                  data4={data[15]}
                  nombre={"Nivel"}
                  categoria={"Actividades"}
                ></PieChartEstadisticas>
              </div>
            </div>
            <div className="col">
              <span
                data-toggle="tooltip"
                title="Aquí puede ver el porcentaje de estudiantes que han tenido cierto porcentaje de entregas de sus actividades asignadas."
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
                  data1={data[16]}
                  data2={data[17]}
                  data3={data[18]}
                  data4={data[19]}
                  nombre={"Completitud"}
                  categoria={"Actividades calificadas"}
                ></PieChartEstadisticas>
              </div>
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
