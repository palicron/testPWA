import React, { useState, useEffect, useContext } from "react";
import "./Entregas.css";
import CardEntregas from "../cardEntregas/CardEntregas";
import Order from "../..//assets/images/order.png";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "react-bootstrap/Modal";
import Button from "@material-ui/core/Button";
import axios from "axios";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import Loading from "../loading/Loading";
import Alert from "../../assets/images/alert.png";
import Tooltip from "@material-ui/core/Tooltip";
import { AppContext } from "../../context/AppContext";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
} from "react-router-dom";
import MaterialTable, { MTableToolbar } from "material-table";

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
  const [open, setOpen] = React.useState(false);
  const [usuarios, setUsuarios] = React.useState(null);

  const [entregas, setEntregas] = React.useState(null);
  let actividad = dataC.idAct;

  let url = "/omicron/entrega/" + actividad + "/actividad";

  useEffect(() => {

    if (!navigator.onLine) {
      if (sessionStorage.getItem("Entregas") === "" ) {
        setEntregas("Loading...");
        setUsuarios("Loading...");
      } else {
        setEntregas(JSON.parse(sessionStorage.getItem("Entregas")));
        setUsuarios(JSON.parse((sessionStorage.getItem("Usuarios"));
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
                if (stu["_id"] == element["student"])
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
            sessionStorage.setItem("Entregas",JSON.stringify(datos));
            sessionStorage.setItem("Usuarios",JSON.stringify(response.data));
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

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleCloseM = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }

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

  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  const uploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "omicromio");
    setLoading(true);
    const res = await fetch(
      "	https://api.cloudinary.com/v1_1/dyd2my0fe/image/upload",
      {
        method: "POST",
        body: data,
      },
    ).then((data) => {
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
  return (<main>
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
                Regresar
              </Link>
            </div>

            <h1 className="mt-2">Entregas realizadas</h1>
          </div>
          <div className="col-md-3">
            <button
              id="volverCurso"
              type="button"
              className="btn btn-light bg-white rounded-pill shadow-sm px-4 mb-4"
              onClick={handleShow}
            >
              <a className="btn">Cargar entregas</a>
            </button>
          </div>
        </div>

        <div>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/home" className="breadcrumb-item-color">Home</Link>
              </li>
              <li className="breadcrumb-item">
                <Link to="/materias" className="breadcrumb-item-color">Materias</Link>
              </li>
              <li className="breadcrumb-item">
                <Link to="/actividades" className="breadcrumb-item-color">Actividades</Link>
              </li>
              <li className="breadcrumb-item breadcrumb-item-coloractive" aria-current="page">
                Actividad - Entrega
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
              exportButton: true
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
                { title: "Estudiante", field: "fullName" },

                {
                  title: "Nota",
                  field: "grade",
                  render: (rowData) => (
                    <>
                      {rowData.grade == null || rowData.grade == "" ? (
                        <Tooltip
                          className="tooltip-entregas"
                          title="Necesita calificación"
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
                { title: "Fecha envío", field: "submissionDate",
              render:(rowData)=>(<>{rowData.submissionDate.split('T')[0]}</>) },
                {
                  title: "",
                  sorting: false,
                  field: "httpLink",
                  render: (rowData) => (
                    <Link
                      to={"/calificaciones"}
                      className="btn btn-primary btn-primary-actividades"
                      onClick={() => {
                        setDataC({ ...dataC, idEntrega: rowData._id });
                      }}
                    >
                      {rowData.grade == null || rowData.grade == ""
                        ? "Calificar"
                        : "Actualizar"}
                    </Link>
                  ),
                },
              ]}
              data={entregas}
              title={"Entregas de " + dataC.nameAct}
            />
          )}
        </div>
        <Modal size="lg" show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Cargar entregas </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="form-group">
              <label for="nombreActividad">Estudiante:</label>
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

            <h1>Cargar imagen o pdf</h1>
            <input
              type="file"
              name="file"
              placeholder="Upload an image"
              onChange={uploadImage}
            />
            {loading ? (
              <h3>Cargando...</h3>
            ) : (
              <img src={image} style={{ width: "300px" }} />
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Aceptar
            </Button>
          </Modal.Footer>
        </Modal>
      </section>
    </div></main>
  );
}
