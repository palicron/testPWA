import React, { useState, useEffect, useContext } from "react";
import "./Calificaciones.css";
import PDF1 from "../../assets/files/bard.pdf";
import axios from "axios";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AppContext } from "../../context/AppContext";
import Loading from "../loading/Loading";

import { FormattedMessage } from "react-intl";

const botAPI1 = "1417949140:AAEMbyqRd2GTDEXYjz2xZ-a9RGQ4kmT69qE";
let urlBotAPI = "https://api.telegram.org/bot" + botAPI1 + "/getFile?file_id=";
let urlBotAPI2 = "https://api.telegram.org/file/bot" + botAPI1 + "/";

let posicion = 0;
export default function Calificaciones() {
  const [dataC] = useContext(AppContext);
  console.log(dataC);
  const [updating, setUpdating] = useState(false);
  const [entregas, setEntregas] = useState(null);
  const [porcentaje, setPorcentaje] = useState(0);
  const { handleSubmit, register } = useForm();
  const [file, setFile] = useState("");
  const onSubmit = (values) => calificar(values);
  let actividad = dataC.idAct;
  let idEntrega = dataC.idEntrega;
  let url = "/omicron/entrega/" + actividad + "/actividad";

  let loadingSub = "Loading submission";
  let updatingSub = "Updating submission";
  if (navigator.language.startsWith("es")) {
    loadingSub = "Cargando entrega";
    updatingSub = "Actualizando calificación";
  }

  useEffect(() => {

    if (!navigator.onLine) {
      if (sessionStorage.getItem("Actividad") === "") {
        setPorcentaje("Loading...");
        setEntrega("Loading...");
        setEntregas("Loading...");
      } else {
        setPorcentaje(JSON.parse(sessionStorage.getItem("porcentajesCal")));
        setEntrega(JSON.parse(sessionStorage.getItem("entregaCal")));
        setEntregas(JSON.parse(sessionStorage.getItem("entregasCal")));
      }
    } else {
    axios
      .get(url)
      .then((responseEntregas) => {
        // Obtenemos los datos
        axios
          .get("/omicron/estudiantes")
          .then((response) => {
            // Obtenemos los datos
            let datos = [];
            let calificados = 0;
            responseEntregas.data.forEach((element) => {
              if (!element["submission"].startsWith("http")) {
                axios
                  .get(urlBotAPI + element["submission"])
                  .then((responseBot) => {
                    datos.find((x) => x._id === element._id)["submission"] =
                      urlBotAPI2 + responseBot.data.result.file_path;
                    console.log(element["submission"]);
                  });
              }

              if (element["grade"] === null || element["grade"] === "")
                calificados = calificados + 1;

              response.data.forEach((stu) => {
                if (stu["_id"] === element["student"])
                  datos.push({ ...element, firstName: stu["firstName"] });
              });
            });

            setPorcentaje(
              ((responseEntregas.data.length - calificados) /
                responseEntregas.data.length) *
                100,
            );

            let actual = datos.find((x) => x._id === idEntrega);
            setEntrega(actual);

            setEntregas(datos);
            sessionStorage.setItem("porcentajesCal", JSON.stringify(     ((responseEntregas.data.length - calificados) /
            responseEntregas.data.length) *
            100,));
            sessionStorage.setItem("entregaCal", JSON.stringify(actual));
            sessionStorage.setItem("entregasCal", JSON.stringify(datos));
          })
          .catch((e) => {
            // Capturamos los errores
            console.log(e);
          });
      })
      .catch((e) => {
        // Capturamos los errores
        console.log(e);
      });
    } 
  }, []);

  const [entrega, setEntrega] = useState(null);
  const next = () => {
    posicion = posicion + 1;
    if (entregas.length - 1 < posicion) posicion = 0;
    setEntrega(entregas[posicion]);

    if (entrega.Imagenes != null) {
      setFile(entrega.Imagenes[0]);
    }
  };

  const prev = () => {
    posicion = posicion - 1;
    if (0 > posicion) posicion = entregas.length - 1;
    setEntrega(entregas[posicion]);
    if (entrega.Imagenes != null) setFile(entregas.Imagenes[0]);
  };

  const calPor = () => {
    let complete_task = 0;
    for (let i = 0; i < entregas.length; i++) {
      if (entregas[i]["grade"] === null || entregas[i]["grade"] === "") {
        complete_task++;
      }
    }
    return (complete_task / entregas.length) * 100;
  };

  const calificar = (values) => {
    setUpdating(true);
    console.log(values.grade);
    console.log(values.comment);
    entrega.grade = values.grade;
    entrega.comment = values.comment;
    let urlCalificar = "omicron/entrega/" + entrega._id;
    axios.put(urlCalificar, entrega).then((resp) => {
      console.log(urlCalificar);
      console.log(entrega);
      console.log("repsuesta");
      console.log(resp);
      setUpdating(false);
      //setPorcentaje(calPor());
    });
  };
  return (
    <main>
      <div className="page-content container-fluid" id="content">
        <div id="Banner" className="mx-3 banner-calificaciones">
          <div id="banner" className="row">
            <div className="col-2 text-center">
              <Link
                id="Returnbtn"
                className="btn btn-light bg-white rounded-pill shadow-sm px-4"
                to={"/entregas"}
              >
                <i className="fa fa-chevron-right mr-2 transformed180Left"></i>
                <FormattedMessage id="back" />
              </Link>
            </div>
            <div className="col-lg-4 text-center">
              <p id="Nombre_Actividad">{dataC.nameAct}</p>
            </div>
            <div className="col-lg-2 text-left">
              <p>
                <FormattedMessage id="course" />: {dataC.nameCourse}
                <a id="Curso_Actividad"></a>
              </p>
            </div>
            <div className="col-lg-4 text-light">
              <p>
                <FormattedMessage id="graded.percentage" />:{" "}
                {Math.round(porcentaje)}%<a id="Text-Cal-por"></a>
              </p>
            </div>
          </div>
        </div>
        <hr />
        <h1>
          <FormattedMessage id="grading.center" />
        </h1>
        <div>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/home" className="breadcrumb-item-color">
                  Home
                </Link>
              </li>
              <li className="breadcrumb-item">
                <Link to="/materias" className="breadcrumb-item-color">
                  <FormattedMessage id="subjects" />
                </Link>
              </li>
              <li className="breadcrumb-item">
                <Link to="/actividades" className="breadcrumb-item-color">
                  <FormattedMessage id="activities" />
                </Link>
              </li>
              <li className="breadcrumb-item">
                <Link to="/entregas" className="breadcrumb-item-color">
                  <FormattedMessage id="activity.submissions" />
                </Link>
              </li>
              <li
                className="breadcrumb-item breadcrumb-item-coloractive"
                aria-current="page"
              >
                <FormattedMessage id="grading.center" />
              </li>
            </ol>
          </nav>
        </div>
        <div className="text-center mx-3">
          {entregas == null ? (
            <h2>
              <Loading texto={loadingSub} />
            </h2>
          ) : (
            <div className="row">
              <div className="col-sm-12 col-md-6 col-lg-8">
                {(entrega?.submission).endsWith(".png") ||
                (entrega?.submission).endsWith(".jpg") ||
                (entrega?.submission).endsWith(".jpeg") ? (
                  <img
                    src={entrega?.submission}
                    className="imagen-calificacion-Calificaciones"
                  ></img>
                ) : (
                  <object
                    id="PDFReader"
                    data={PDF1}
                    type="application/pdf"
                    className="pdf-calificacion-Calificaciones"
                  >
                    <p>
                      It appears you don't have a PDF plugin for this browser.
                      No biggie... you can
                      <a href={PDF1}>Click here to download the PDF file.</a>
                    </p>
                  </object>
                )}
              </div>

              <div
                id="Format-container"
                className="col-sm-12 col-md-6 col-lg-4"
              >
                <div className="text-center mt-3">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="col-lg-12">
                      <h2>
                        <FormattedMessage id="student" />
                      </h2>
                      <hr />
                      <p id="Nombre_estudiante">{entrega.firstName}</p>
                    </div>
                    <hr />
                    {updating ? (
                      <h2>
                        <Loading texto={updatingSub} />
                      </h2>
                    ) : (
                      <>
                        <div className="form-group col-lg-12 text-center">
                          <h3>
                            <FormattedMessage id="grade.sustantive" />
                          </h3>

                          <div id="searchSection" className="mx-3">
                            <div className="d-flex justify-content-center">
                              <div className="grade-bar">
                                <label
                                  for="grade"
                                  className="color--white-home"
                                ></label>
                                <input
                                  className="filter grade-input"
                                  type="text"
                                  name="grade"
                                  ref={register()}
                                  placeholder={
                                    entrega.grade === null ||
                                    entrega.grade === ""
                                      ? ""
                                      : entrega.grade
                                  }
                                  id="grade"
                                />
                                <a href="#" className="grade-icon">
                                  /5
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="row-cols-12 text-center">
                          {entrega.grade === null || entrega.grade === "" ? (
                            <p id="Alert">
                              <FormattedMessage id="needs.grading" />
                            </p>
                          ) : (
                            <p id="Alert">
                              <FormattedMessage id="graded" />
                            </p>
                          )}
                        </div>

                        <div className="form-group col-lg-12 text-left">
                          <hr />
                          <div id="Colapse_coments" className="">
                            <div className="form-group">
                              <label htmlFor="comentario">
                                <FormattedMessage id="comment" />
                              </label>

                              <textarea
                                placeholder={entrega.comment}
                                id="comentario"
                                name="comment"
                                ref={register()}
                                className="form-control "
                              ></textarea>
                            </div>
                          </div>

                          <button
                            type="submit"
                            className="btn btn-primary btn-primary-calificar col-12"
                          >
                            {entrega?.grade === null ||
                            entrega?.grade === "" ? (
                              <FormattedMessage id="grade" />
                            ) : (
                              <FormattedMessage id="update" />
                            )}
                          </button>
                        </div>
                      </>
                    )}
                  </form>
                  <hr />
                  <div className="row text-center">
                    <div className="col-6">
                      <i
                        onClick={prev}
                        className=" flecha fa fa-arrow-left"
                      ></i>
                    </div>
                    <div className="col-6">
                      <i
                        onClick={next}
                        className=" flecha fa fa-arrow-right"
                      ></i>
                    </div>
                  </div>
                </div>
                <hr />
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
