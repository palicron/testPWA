import React, { useState, useEffect, useContext } from "react";
import "./Entregas.css";
import Order from "../..//assets/images/order.png";
import MenuItem from "@material-ui/core/MenuItem";
import Modal from "react-bootstrap/Modal";
import Button from "@material-ui/core/Button";
import axios from "axios";
import Select from "@material-ui/core/Select";
import Loading from "../loading/Loading";
import Alert from "../../assets/images/alert.png";
import Tooltip from "@material-ui/core/Tooltip";
import { AppContext } from "../../context/AppContext";
import { Link } from "react-router-dom";
import MaterialTable, { MTableToolbar } from "material-table";
import { FormattedMessage, FormattedDate } from "react-intl";

function ordenarPorPropiedad(propiedad) {
  return function (a, b) {
    if (a[propiedad] > b[propiedad]) return 1;
    else if (a[propiedad] < b[propiedad]) return -1;

    return 0;
  };
}

export default function Entregas() {
  const [dataC, setDataC] = useContext(AppContext);
  console.log(dataC);
  const [estud, setEstud] = React.useState("");

  const handleChange = (event) => {
    setEstud(event.target.value);
  };
  const [open] = React.useState(false);
  const [usuarios, setUsuarios] = React.useState(null);

  const [entregas, setEntregas] = React.useState(null);
  let actividad = dataC.idAct;

  let url = "/omicron/entrega/" + actividad + "/actividad";

  let titleStudent = "Student";
  let titleGrade = "Grade";
  let titleSubmitDate = "Submit date";
  let needsGrading = "Needs grading";
  let tableTitle = dataC.nameAct + " submissions";

  if (navigator.language.startsWith("es")) {
    titleStudent = "Estudiante";
    titleGrade = "Nota";
    titleSubmitDate = "Fecha de envío";
    needsGrading = "Necesita calificación";
    tableTitle = "Entregas de " + dataC.nameAct;
  }

  useEffect(() => {
    console.log(navigator.onLine);
    if (!navigator.onLine) {
      if (sessionStorage.getItem("Entregas") === "") {
        setEntregas("Loading...");
        setUsuarios("Loading...");
      } else {
        setEntregas(JSON.parse(sessionStorage.getItem("Entregas")));
        setUsuarios(JSON.parse(sessionStorage.getItem("Usuarios")));
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
              responseEntregas.data.forEach((element) => {
                response.data.forEach((stu) => {
                  if (stu["_id"] === element["student"])
                    datos.push({
                      ...element,
                      fullName: stu["firstName"] + " " + stu["lastName"],
                      firstName: stu["firstName"],
                      lastName: stu["lastName"],
                    });
                });
              });
              setEntregas(datos);
              setUsuarios(response.data);
              sessionStorage.setItem("Entregas", JSON.stringify(datos));
              sessionStorage.setItem("Usuarios", JSON.stringify(response.data));
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
  }, [url]);

  const anchorRef = React.useRef(null);

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const [image] = useState("");
  const [loading, setLoading] = useState(false);

  const uploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "omicromio");
    setLoading(true);
    await fetch("	https://api.cloudinary.com/v1_1/dyd2my0fe/image/upload", {
      method: "POST",
      body: data,
    }).then((data) => {
      data.json().then((data2) => {
        console.log(data2.secure_url);
        let idEstudiante = estud;
        entregas.push({
          activity: actividad,
          grade: null,
          submissionDate: "2020-11-16T09:31:40.551+00:00",
          student: idEstudiante,
          Summint_date: "10/16/2019",
          submission: data2.secure_url,
        });
        let e = entregas;
        setEntregas(null);
        let urlPost =
          "/omicron/entrega/" + actividad + "/entrega/" + idEstudiante;
        axios
          .post(urlPost, {
            activity: actividad,
            grade: null,
            submissionDate: "2020-11-16T09:31:40.551+00:00",
            student: idEstudiante,
            Summint_date: "10/16/2019",
            submission: data2.secure_url,
          })
          .then((resp) => {
            console.log("repsuesta");
            console.log(resp);
            setEntregas(e);
          });
      });
    });

    setLoading(false);
  };

  const ordFecha = () => {
    entregas.sort(ordenarPorPropiedad("Summint_date"));
    //handleCloseM()
  };
  const ordNombre = () => {
    console.log("Nombre");
    entregas.sort(ordenarPorPropiedad("Estu_name"));
    //handleCloseM()
  };
  return (
    <main>
      <div className="page-content p-2" id="content">
        <section className="mx-3">
          <div className="row">
            <div className="col-md-9">
              <div className="col-md-3">
                <Link
                  id="Returnbtn"
                  className="btn btn-light bg-white rounded-pill shadow-sm px-4"
                  to={"/actividades"}
                >
                  <i className="fa fa-chevron-right mr-2 transformed180Left"></i>
                  <FormattedMessage id="back" />
                </Link>
              </div>

              <h1 className="mt-2">
                <FormattedMessage id="submissions.title" />
              </h1>
            </div>
            <div className="col-md-3">
              {navigator.onLine ? (
              <button
                id="volverCurso"
                type="button"
                className="btn btn-light bg-white rounded-pill shadow-sm px-4 mb-4"
                onClick={handleShow}
              >
                <a className="btn">
                  <FormattedMessage id="submissions.load" />
                </a>
              </button>):("")
              }
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
                <li className="breadcrumb-item">
                  <Link to="/actividades" className="breadcrumb-item-color">
                    <FormattedMessage id="activities" />
                  </Link>
                </li>
                <li
                  className="breadcrumb-item breadcrumb-item-coloractive"
                  aria-current="page"
                >
                  <FormattedMessage id="activity.submissions" />
                </li>
              </ol>
            </nav>
          </div>

          <div className="bottom-entregas" id="entregas">
            {entregas === null ? (
              <Loading texto="Cargando entregas..."></Loading>
            ) : (
              <MaterialTable
                options={{
                  exportButton: true,
                }}
                icons={{
                  NextPage: () => <i className=" flecha fa fa-arrow-right"></i>,
                  PreviousPage: () => (
                    <i className=" flecha fa fa-arrow-left"></i>
                  ),
                  SortArrow: () => (
                    <img src={Order} className="icon-order" alt="ordenar"></img>
                  ),
                  Search: () => <i className="fa fa-search"></i>,
                  Clear: () => <i className="fa fa-times"></i>,
                  Export: () => <i className="flecha fa fa-download"></i>,
                  FirstPage: () => (
                    <i className="flecha fa fa-angle-double-left"></i>
                  ),
                  LastPage: () => (
                    <i className="flecha fa fa-angle-double-right"></i>
                  ),
                }}
                components={{
                  Toolbar: (props) => (
                    <div style={{ backgroundColor: "#e8eaf5" }}>
                      <MTableToolbar {...props} />
                    </div>
                  ),
                }}
                columns={[
                  { title: titleStudent, field: "fullName" },

                  {
                    title: titleGrade,
                    field: "grade",
                    render: (rowData) => (
                      <>
                        {rowData.grade == null || rowData.grade == "" ? (
                          <Tooltip
                            className="tooltip-entregas"
                            title={needsGrading}
                            placement="right-start"
                            arrow
                          >
                            <img
                              className="tooltip-entregas"
                              src={Alert}
                              alt="alerta"
                              width="25px"
                              data-toggle="tooltip"
                              data-placement="right"
                              title=""
                              data-original-title="Necesita calificación"
                            ></img>
                          </Tooltip>
                        ) : (
                          rowData.grade
                        )}
                      </>
                    ),
                  },
                  {
                    title: titleSubmitDate,
                    field: "submissionDate",
                    render: (rowData) => (
                      <FormattedDate
                        value={new Date(rowData.submissionDate.split("T")[0])}
                        month="short"
                        day="numeric"
                        weekday="short"
                        hour="numeric"
                        minute="numeric"
                      />
                    ),
                  },
                  {
                    title: "",
                    sorting: false,
                    field: "httpLink",
                    render: (rowData) => (
                      <Link
                        to={"/calificaciones"}
                        className="btn btn-primary btn-primary-entregas"
                        onClick={() => {
                          setDataC({ ...dataC, idEntrega: rowData._id });
                        }}
                      >
                        {rowData.grade == null || rowData.grade == "" ? (
                          <FormattedMessage id="grade" />
                        ) : (
                          <FormattedMessage id="update" />
                        )}
                      </Link>
                    ),
                  },
                ]}
                data={entregas}
                title={tableTitle}
              />
            )}
          </div>
          <Modal size="lg" show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>
                <FormattedMessage id="submissions.load" />{" "}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="form-group">
                <label for="nombreActividad">
                  <FormattedMessage id="student" />:
                </label>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={estud}
                  onChange={handleChange}
                >
                  {usuarios?.map((usuario, index) => (
                    <MenuItem value={usuario._id}>
                      {usuario.firstName + " " + usuario.lastName}
                    </MenuItem>
                  ))}
                </Select>
              </div>

              <h1>
                <FormattedMessage id="load.image.pdf" />
              </h1>
              <input
                type="file"
                name="file"
                placeholder="Upload an image"
                onChange={uploadImage}
              />
              {loading ? (
                <h3>
                  <FormattedMessage id="loading" />
                  ...
                </h3>
              ) : (
                <img src={image} style={{ width: "300px" }} />
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                <FormattedMessage id="accept" />
              </Button>
            </Modal.Footer>
          </Modal>
        </section>
      </div>
    </main>
  );
}
