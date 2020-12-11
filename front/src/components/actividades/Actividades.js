import React, { useEffect, useState, useContext } from "react";
import { useForm } from "react-hook-form";
import Modal from "react-bootstrap/Modal";
import AddAct from "../..//assets/images/addAct.png";
import "./Actividades.css";
import axios from "axios";
import Loading from "../loading/Loading";
import Trash from "../../assets/images/trash.png";
import Edit from "../../assets/images/icons8-edit-512.png";
import Order from "../..//assets/images/order.png";
import { AppContext } from "../../context/AppContext";
import { Link } from "react-router-dom";
import MaterialTable, { MTableToolbar } from "material-table";
import { FormattedMessage, FormattedDate } from "react-intl";

export default function Actividades() {
  const [dataC, setDataC] = useContext(AppContext);
  let idDelete = 0;
  const [actividades, setActividades] = useState(null);
  let idMateria = dataC.idMateria;
  let url = "/omicron/actividad/" + idMateria + "/subject";
  let loadingActivities = "Loading activities";
  let editActivity = "Edit activity";
  let deleteActivity = "Delete activity";
  let tableTile = dataC.nameMateria + " activities in " + dataC.nameCourse;
  let titleName = "Name";
  let titleDueDate = "Due date";
  let titleTerm = "Term";
  let titlePercentage = "Percentage";
  let dataPlaceholders = ["Name", "Description"];

  if (navigator.language.startsWith("es")) {
    loadingActivities = "Cargando actividades";
    editActivity = "Editar actividad";
    deleteActivity = "Eliminar actividad";
    tableTile =
      "Actividades de " + dataC.nameMateria + " en " + dataC.nameCourse;
    titleName = "Nombre";
    titleDueDate = "Fecha vencimiento";
    titleTerm = "Periodo";
    titlePercentage = "Porcentaje";
    dataPlaceholders = ["Nombre", "Descripción"];
  }
  useEffect(() => {
    if (!navigator.onLine) {
      if (sessionStorage.getItem("Actividad") === "") {
        setActividades("Loading...");
      } else {
        setActividades(JSON.parse(sessionStorage.getItem("Actividad")));
      }
    } else {
      axios
        .get(url)
        .then((response) => {
          // Obtenemos los datos
          console.log(response);
          setActividades(response.data);
          sessionStorage.setItem("Actividad", JSON.stringify(response.data));
        })
        .catch((e) => {
          // Capturamos los errores
          console.log(e);
        });
    }
  }, [url]);

  const [eliminar, setEliminar] = useState(false);
  const [actividadEliminar, setActividadEliminar] = useState(null);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { handleSubmit, register, errors } = useForm();
  const onSubmit = (values) => crearAct(values);
  function eliminarActividad(id) {
    console.log("eliminado");
    let urlDelete = "/omicron/actividad/" + id;
    let a = actividades;
    actividades.pop({ _id: id });
    setActividades(null);
    axios
      .delete(urlDelete)
      .then((response) => {
        // Obtenemos los datos
        console.log(response);
        setActividades(a);
        setEliminar(!eliminar);
      })
      .catch((e) => {
        // Capturamos los errores
        console.log(e);
      });
  }
  function crearAct(value) {
    let nombre = value.nombreActividad;
    console.log(nombre);
    let fechaVen = value.fechaVencimiento;
    let periodo = value.periodo;
    let porcentaje = value.porcentaje;
    let descripcion = value.descripcion;
    actividades.push({
      name: nombre,
      submissionDate: fechaVen,
      period: periodo,
      description: descripcion,
      percentage: porcentaje,
      subject: idMateria,
    });
    let a = actividades;
    setActividades(null);
    let urlPost = "/omicron/actividad/" + idMateria + "/createActivity";
    axios
      .post(urlPost, {
        name: nombre,
        submissionDate: fechaVen,
        period: periodo,
        description: descripcion,
        percentage: porcentaje,
        subject: idMateria,
      })
      .then((response) => {
        // Obtenemos los datos
        console.log(response);

        setActividades(a);
      })
      .catch((e) => {
        // Capturamos los errores
        console.log(e);
      });
  }
  return (
    <main>
      <div className="page-content p-2" id="content">
        <section className="mx-3">
          <div className="row">
            <div className="col-md-9">
              <div className="col-sm-3 col-md-3">
                <Link
                  id="Returnbtn"
                  className="btn btn-light bg-white rounded-pill shadow-sm px-4"
                  to={"/materias"}
                >
                  <i className="fa fa-chevron-right mr-2 transformed180Left"></i>
                  <FormattedMessage id="back" />
                </Link>
              </div>
              <h1 className="mt-2">
                <FormattedMessage id="activities" />
              </h1>
            </div>

            <div className="col-sm-6 col-md-3">
              { navigator.onLine ? (
              <button
                className="btn btn-light bg-white rounded-pill shadow-sm px-4 mb-4"
                onClick={() => handleShow()}
                id="editar"
              >
                <img
                  src={AddAct}
                  alt="Add activity"
                  className="icon-create"
                ></img>
                <FormattedMessage id="activities.add" />
              </button>):("") }
            </div>
          </div>

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
                <li
                  className="breadcrumb-item breadcrumb-item-coloractive"
                  aria-current="page"
                >
                  <FormattedMessage id="activities" />
                </li>
              </ol>
            </nav>
          </div>

          <div>
            {actividades === null ? (
              <Loading texto={loadingActivities}></Loading>
            ) : (
              <MaterialTable
                options={{
                  exportButton: true,
                }}
                icons={{
                  Export: () => <i className="flecha fa fa-download"></i>,

                  NextPage: () => <i className=" flecha fa fa-arrow-right"></i>,
                  PreviousPage: () => (
                    <i className=" flecha fa fa-arrow-left"></i>
                  ),
                  SortArrow: () => (
                    <img src={Order} className="icon-order" alt="ordenar"></img>
                  ),
                  Search: () => <i className="fa fa-search"></i>,

                  ClearSearch: () => <i className="fa fa-times"></i>,
                  FirstPage: () => (
                    <i className="flecha fa fa-angle-double-left"></i>
                  ),
                  LastPage: () => (
                    <i className="flecha fa fa-angle-double-right"></i>
                  ),
                }}
                options={{
                  search: true,
                  sorting: true,
                  exportButton: true,
                }}
                components={{
                  Toolbar: (props) => (
                    <div style={{ backgroundColor: "#e8eaf5" }}>
                      <MTableToolbar {...props} />
                    </div>
                  ),
                }}
                localization={{ header: { actions: "" } }}
                actions={[
                  {
                    icon: () => (
                      <Link to={"/actividades/editar"}>
                        <img src={Edit} alt="eliminar" width="30px"></img>
                      </Link>
                    ),
                    tooltip: editActivity,
                    onClick: (event, rowData) => {
                      // Do save operation
                    },
                  },
                  {
                    icon: () => (
                      <img src={Trash} alt="eliminar" width="30px"></img>
                    ),
                    tooltip: deleteActivity,
                    onClick: (event, rowData) => {
                      idDelete = rowData._id;
                      setActividadEliminar({
                        _id: rowData._id,
                        name: rowData.name,
                      });
                      setEliminar(!eliminar);
                    },
                  },
                ]}
                options={{
                  actionsColumnIndex: -1,
                }}
                columns={[
                  { title: titleName, field: "name" },

                  {
                    title: titleDueDate,
                    field: "submissionDate",
                    render: (rowData) => (
                      <FormattedDate
                        value={new Date(rowData.submissionDate.split("T")[0])}
                        year="numeric"
                        month="short"
                        day="numeric"
                        weekday="long"
                      />
                    ),
                  },

                  { title: titleTerm, field: "period" },
                  {
                    title: titlePercentage,
                    field: "percentage",
                    render: (rowData) => <>{rowData.percentage}%</>,
                  },
                  {
                    title: "",
                    field: "httpLink",
                    sorting: false,
                    render: (rowData) => (
                      <Link
                        to={"/entregas"}
                        className="btn btn-primary btn-primary-actividades"
                        onClick={() => {
                          setDataC({
                            ...dataC,
                            idAct: rowData._id,
                            nameAct: rowData.name,
                          });
                        }}
                      >
                        <FormattedMessage id="activities.see.assignment" />
                      </Link>
                    ),
                  },
                ]}
                data={actividades}
                title={tableTile}
              />
            )}
          </div>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>
                <FormattedMessage id="activities.create" />{" "}
              </Modal.Title>
            </Modal.Header>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Modal.Body>
                <div className="form-group">
                  <label htmlFor="nombreActividad">
                    <FormattedMessage id="activities.name" />:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="nombreActividad"
                    placeholder={dataPlaceholders[0]}
                    ref={register()}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="descripcion">
                    <FormattedMessage id="activities.description" />
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="descripcion"
                    placeholder={dataPlaceholders[1]}
                    ref={register()}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="fechaVencimiento">
                    <FormattedMessage id="due.date" />:
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    name="fechaVencimiento"
                    ref={register()}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="periodo">
                    <FormattedMessage id="term" />:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="periodo"
                    placeholder="1"
                    ref={register()}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="porcentaje">
                    <FormattedMessage id="percentage" />:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="porcentaje"
                    placeholder="10"
                    ref={register()}
                  />
                </div>
              </Modal.Body>
              <Modal.Footer>
                <button
                  className="btn btn-secondary"
                  type="button"
                  onClick={handleClose}
                >
                  <FormattedMessage id="cancel" />
                </button>
                <button
                  className="btn btn-primary"
                  type="submit"
                  onClick={handleClose}
                >
                  <FormattedMessage id="activities.create" />
                </button>
              </Modal.Footer>
            </form>
          </Modal>
          <Modal show={eliminar} onHide={setEliminar}>
            <Modal.Header closeButton>
              <Modal.Title>
                <FormattedMessage id="activities.delete" />{" "}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <FormattedMessage id="activities.confirm.delete" />
              {actividadEliminar?.name + " ?"}
            </Modal.Body>
            <Modal.Footer>
              <button
                className="btn btn-secondary"
                onClick={() => setEliminar(false)}
              >
                <FormattedMessage id="cancel" />
              </button>
              <button
                className="btn btn-primary"
                onClick={() => {
                  setEliminar(false);
                  eliminarActividad(actividadEliminar?._id);
                }}
              >
                <FormattedMessage id="activities.delete" />
              </button>
            </Modal.Footer>
          </Modal>
        </section>
      </div>
    </main>
  );
}
