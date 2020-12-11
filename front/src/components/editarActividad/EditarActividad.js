import React, { useEffect, useState, useContext } from "react";
import "./EditarActividad.css";
import CodeQR from "../../assets/images/qr.png";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import axios from "axios";
import { AppContext } from "../../context/AppContext";
import { FormattedMessage, FormattedDate } from "react-intl";

export default function EditarActividad() {
  const [activiNombre, setActividades] = useState("");
  const [descripcion, SetDescripcion] = useState("");
  const [periodo, setPeriodo] = useState("");
  const [porcentaje, setPorcentaje] = useState("");
  const [fecha, setFecha] = useState("");
  const { handleSubmit, register, errors } = useForm();
  const onSubmit = (values) => updateAct(values);

  const [dataC] = useContext(AppContext);
  let actividadId = dataC.idAct;
  let url = "/omicron/actividad/" + actividadId;

  useEffect(() => {
    if (!navigator.onLine) {
      if (sessionStorage.getItem("Actividad") === "") {
        setActividades("Loading...");
      } else {
        setActividades(JSON.parse(sessionStorage.getItem("ActividadEdit")));
        SetDescripcion(JSON.parse(sessionStorage.getItem("DescripcionEdit")));
        setPeriodo(JSON.parse(sessionStorage.getItem("PeriodoEdit")));
        setPorcentaje(JSON.parse(sessionStorage.getItem("porcentajeEdit")));
        setFecha(JSON.parse(sessionStorage.getItem("fechaEdit")));
      }
    } else {
    axios
      .get(url)
      .then((response) => {
        // Obtenemos los datos
        let actual = response.data;
        setActividades(actual.name);
        SetDescripcion(actual.description);
        setPeriodo(actual.period);
        setPorcentaje(actual.percentage);

        let today = new Date(actual.submissionDate);
        var dd = String(today.getDate()).padStart(2, "0");
        var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
        var yyyy = today.getFullYear();
        today = yyyy + "-" + mm + "-" + dd;
        setFecha(today);
        sessionStorage.setItem("ActividadEdit", JSON.stringify(actual.name));
        sessionStorage.setItem("DescripcionEdit", JSON.stringify(actual.description));
        sessionStorage.setItem("PeriodoEdit", JSON.stringify(actual.period));
        sessionStorage.setItem("porcentajeEdit", JSON.stringify(actual.percentage));
        sessionStorage.setItem("fechaEdit", JSON.stringify(today));
      })
      .catch((e) => {
        // Capturamos los errores
        console.log(e);
      });
    }
  }, [url]);

  function updateAct(value) {
    let nombre = "";
    let date = "";
    let descrip = "";

    if (value.nombreActividad == "") {
      nombre = activiNombre;
    } else {
      nombre = value.nombreActividad;
    }
    if (value.fecha == "") {
      date = new Date(fecha);
      console.log(date);
    } else {
      date = new Date(value.fecha);
      console.log(date);
    }
    if (value.descripcion == "") {
      descrip = descripcion;
    } else {
      descrip = value.descripcion;
    }

    let body = {
      name: nombre,
      submissionDate: date,
      description: descrip,
    };

    console.log(value);

    axios
      .put(url, body)
      .then((response) => {
        // Obtenemos los datos
        console.log(response);
      })
      .catch((e) => {
        // Capturamos los errores
        console.log(e);
      });
  }

  return (
    <div className="page-content p-2" id="content">
      <form onSubmit={handleSubmit(onSubmit)}>
        <section className="mx-3">
          <div className="row p-3">
            <div className="col-sm-3 col-md-3 text-center">
              <Link
                id="Returnbtn"
                className="btn btn-light bg-white rounded-pill shadow-sm px-4"
                to={"/actividades"}
              >
                <i className="fa fa-chevron-right mr-2 transformed180Left"></i>
                <FormattedMessage id="back" />
              </Link>
            </div>
            <div className="col-sm-12">
              <h2>
                <FormattedMessage id="activities.edit" />
              </h2>
            </div>
          </div>
          <div className="row p-3">
            <div className="col-sm-6"></div>
            <div className="col-sm-6">
              <div className="text-center-edit-activity">
                <h3>
                  <FormattedMessage id="qr.code" />
                </h3>
              </div>
            </div>
          </div>
          <div className="row p-3">
            <div className="col-sm-6">
              <div className="row">
                <div className="col-sm-12">
                  {" "}
                  <h4>
                    <FormattedMessage id="name" />
                  </h4>{" "}
                </div>
              </div>
              <div className="row">
                <div className="col-sm-12">
                  <form>
                    <input
                      type="text"
                      className="form-control"
                      name="nombreActividad"
                      placeholder={activiNombre}
                      ref={register()}
                    />
                  </form>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-12">
                  {" "}
                  <br></br>{" "}
                  <h4>
                    {" "}
                    <FormattedMessage id="activities.edit.current.date" />
                  </h4>{" "}
                  <strong>
                    <FormattedDate
                      value={new Date(fecha)}
                      year="numeric"
                      month="short"
                      day="numeric"
                      weekday="long"
                      hour="numeric"
                      minute="numeric"
                    />
                  </strong>{" "}
                </div>
                <div className="col-sm-12">
                  {" "}
                  <br></br>{" "}
                  <h4>
                    <FormattedMessage id="activities.edit.new.date" />{" "}
                  </h4>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-12">
                  <form>
                    <input type="date" name="fecha" ref={register()} />
                  </form>
                </div>

                <div className="col-sm-6">
                  <div>
                    <br></br>
                    <h4>
                      {" "}
                      <FormattedMessage id="term" /> {periodo}{" "}
                    </h4>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="container-img-qr">
                <img src={CodeQR} alt="QR code" className="imagen-qrqr" />
              </div>
              <div className="col-sm-12">
                <div className="text-center-edit-activity">
                  <h2>
                    <FormattedMessage id="percentage" />: {porcentaje}%
                  </h2>
                </div>
              </div>
            </div>
          </div>
          <div className="row p-3"></div>
          <div className="row p-3">
            <div className="col-sm-12">
              <div>
                <h4>
                  <FormattedMessage id="activities.edit.desc" />
                </h4>
              </div>
              <div>
                <textarea
                  rows="4"
                  cols="70"
                  placeholder={descripcion}
                  name="descripcion"
                  ref={register()}
                ></textarea>
              </div>
            </div>
          </div>
          <button className="btn btn-primary btn-primary-calificar col-8">
            <FormattedMessage id="update" />
          </button>
        </section>
      </form>
    </div>
  );
}
