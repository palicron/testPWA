import React, { useRef, useContext, useState, useEffect } from "react";
import userImg from "../../assets/images/icons8-user-male-512.png";
import "./Home.css";
import MediaActividades from "../actividadesListHome/MediaActividades";
import Curso from "./Curso";
import Rating from "@material-ui/lab/Rating";
import Box from "@material-ui/core/Box";
import axios from "axios";
import { AppContext } from "../../context/AppContext";

export default function Home(props) {
  //
  const [dataC] = useContext(AppContext);

  // Rating
  const [value, setValue] = React.useState(0);

  // Usuario
  const urlUser = "/omicron/usuarios/" + dataC.userId;
  const urlUserUpdate = "/omicron/profesores/" + dataC.userId;

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    axios
      .get(urlUser)
      .then((response) => {
        // Obtenemos los datos
        console.log(response.data);
        setUserData(response.data);
        setValue(response.data.rating);
      })
      .catch((e) => {
        // Capturamos los errores
        console.log(e);
      });
  }, [urlUser]);

  function actualizarCalificacion(newValue) {
    console.log(newValue);
    setUserData({ ...userData, rating: newValue });
    axios
      .put(urlUserUpdate, {
        username: userData.username,
        firstName: userData.firstName,
        secondName: userData.secondName,
        lastName: userData.lastName,
        email: userData.email,
        role: userData.role,
        school: userData.school,
        rating: newValue,
      })
      .then((response) => {
        // Obtenemos los datos
        console.log(response);
      })
      .catch((e) => {
        // Capturamos los errores
        console.log(e);
      });
  }

  // SideBar

  const content = useRef(null);
  const iconHome = useRef(null);
  const onsideBarCollapseClick = () => {
    content.current.classList.toggle("active");
    iconHome.current.classList.toggle("transformed180Right");
    props.collapseNavbar();
  };

  const actividades = [
    {
      id: 1,
      nombre: "Taller de lectura",
      materia: "Ingles",
      curso: "5A",
      QR: "urlqr1",
      Fecha_vencimiento: "2020-10-30",
      Entregas:
        "https://gist.github.com/nicolash0125/f3f589cdd5bb25be78374f9dcbfce62a/raw/4998333df9e3fb0e3a6088a8d62a8904d4e6b411/entregasAct1.json",
      image: "https://csnaturales.files.wordpress.com/2008/07/actividades.png",
    },
    {
      id: 2,
      nombre: "Ejercicio",
      QR: "urlqr2",
      materia: "Inglés",
      curso: "5A",
      Fecha_vencimiento: "2020-11-12",
      Entregas:
        "https://gist.github.com/nicolash0125/f3f589cdd5bb25be78374f9dcbfce62a/raw/4998333df9e3fb0e3a6088a8d62a8904d4e6b411/entregasAct1.json",
      image: "",
    },
    {
      id: 3,
      nombre: "Gramática",
      QR: "urlqr2",
      materia: "Ingles",
      curso: "5B",
      Fecha_vencimiento: "2020-11-13",
      Entregas:
        "https://gist.github.com/nicolash0125/f3f589cdd5bb25be78374f9dcbfce62a/raw/4998333df9e3fb0e3a6088a8d62a8904d4e6b411/entregasAct1.json",
      image: "https://csnaturales.files.wordpress.com/2008/07/actividades.png",
    },
    {
      id: 4,
      nombre: "Escritura",
      QR: "urlqr2",
      materia: "Ingles",
      curso: "5B",
      Fecha_vencimiento: "2020-12-18",
      Entregas:
        "https://gist.github.com/nicolash0125/f3f589cdd5bb25be78374f9dcbfce62a/raw/4998333df9e3fb0e3a6088a8d62a8904d4e6b411/entregasAct1.json",
      image: "https://csnaturales.files.wordpress.com/2008/07/actividades.png",
    },
    {
      id: 5,
      nombre: "Ejercicios",
      QR: "urlqr2",
      materia: "Matematicas",
      curso: "5B",
      Fecha_vencimiento: "2020-12-13",
      Entregas:
        "https://gist.github.com/nicolash0125/f3f589cdd5bb25be78374f9dcbfce62a/raw/4998333df9e3fb0e3a6088a8d62a8904d4e6b411/entregasAct1.json",
      image: "https://csnaturales.files.wordpress.com/2008/07/actividades.png",
    },
  ];

  const state = {
    actividades: [
      {
        id: 1,
        nombre: "Taller de lectura",
        materia: "Ingles",
        curso: "5A",
        QR: "urlqr1",
        Fecha_vencimiento: "2020-10-30",
        Entregas:
          "https://gist.github.com/nicolash0125/f3f589cdd5bb25be78374f9dcbfce62a/raw/4998333df9e3fb0e3a6088a8d62a8904d4e6b411/entregasAct1.json",
        image:
          "https://csnaturales.files.wordpress.com/2008/07/actividades.png",
      },
      {
        id: 2,
        nombre: "Ejercicio",
        QR: "urlqr2",
        materia: "Inglés",
        curso: "5A",
        Fecha_vencimiento: "2020-11-12",
        Entregas:
          "https://gist.github.com/nicolash0125/f3f589cdd5bb25be78374f9dcbfce62a/raw/4998333df9e3fb0e3a6088a8d62a8904d4e6b411/entregasAct1.json",
        image: "",
      },
      {
        id: 3,
        nombre: "Gramática",
        QR: "urlqr2",
        materia: "Ingles",
        curso: "5B",
        Fecha_vencimiento: "2020-11-13",
        Entregas:
          "https://gist.github.com/nicolash0125/f3f589cdd5bb25be78374f9dcbfce62a/raw/4998333df9e3fb0e3a6088a8d62a8904d4e6b411/entregasAct1.json",
        image:
          "https://csnaturales.files.wordpress.com/2008/07/actividades.png",
      },
      {
        id: 4,
        nombre: "Escritura",
        QR: "urlqr2",
        materia: "Ingles",
        curso: "5B",
        Fecha_vencimiento: "2020-12-18",
        Entregas:
          "https://gist.github.com/nicolash0125/f3f589cdd5bb25be78374f9dcbfce62a/raw/4998333df9e3fb0e3a6088a8d62a8904d4e6b411/entregasAct1.json",
        image:
          "https://csnaturales.files.wordpress.com/2008/07/actividades.png",
      },
      {
        id: 5,
        nombre: "Ejercicios",
        QR: "urlqr2",
        materia: "Matematicas",
        curso: "5B",
        Fecha_vencimiento: "2020-12-13",
        Entregas:
          "https://gist.github.com/nicolash0125/f3f589cdd5bb25be78374f9dcbfce62a/raw/4998333df9e3fb0e3a6088a8d62a8904d4e6b411/entregasAct1.json",
        image:
          "https://csnaturales.files.wordpress.com/2008/07/actividades.png",
      },
    ],
    inputValue: "",
  };

  function ordenarPorPropiedad(propiedad) {
    return function (a, b) {
      if (a[propiedad] > b[propiedad]) {
        return 1;
      } else if (a[propiedad] < b[propiedad]) {
        return -1;
      }

      return 0;
    };
  }

  function ordenarActividadesFecha() {
    actividades.sort(ordenarPorPropiedad("Fecha_vencimiento"));
  }

  ordenarActividadesFecha();

  const filterOnChange = (event) => {
    console.log("onChange: ", event.target.value);
    state.inputValue = event.target.value;
    console.log(state.inputValue);

    //return filteredActividades;
  };

  let filteredActividades = state.actividades.filter((item) => {
    return item.nombre.toLowerCase().includes(state.inputValue.toLowerCase());
  });

  /*<div id="searchSection" className="mx-3">
            <div className="d-flex justify-content-left">
              <div className="searchbar">
                <label htmlFor="search" className="color--white-home">
                  -
                </label>
                <input
                  className="filter search_input"
                  type="text"
                  name="Barra búsqueda"
                  id="search"
                  placeholder="Búsqueda"
                  onChange={filterOnChange}
                />
                <span className="search_icon">
                  <i className="fa fa-search"></i>
                </span>
              </div>
            </div>
          </div>*/

  return (
    <main>
      <div className="page-content p-2" id="content" ref={content}>
        <button
          onClick={onsideBarCollapseClick}
          type="button"
          className="btn btn-light bg-white rounded-pill shadow-sm px-4 mb-4"
        >
          <i
            className="fa fa-chevron-right mr-2 transformed180Left"
            ref={iconHome}
          ></i>
          <small className="text-uppercase font-weight-bold">Menu</small>
        </button>

        <div>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li
                className="breadcrumb-item breadcrumb-item-coloractive"
                aria-current="page"
              >
                Home
              </li>
            </ol>
          </nav>
        </div>

        <div className="container-fluid">
          <Curso></Curso>

          <section id="proximasActividadesSection" className="mx-3 my-3 mt-5">
            <div className="row no-gutters">
              <div className="col-md-6 col-xl-5 col-12">
                <h2 className="mb-4">Próximas actividades</h2>
                <ul className="list-unstyled" id="allNextActivities">
                  {filteredActividades.map((actividad) => (
                    <MediaActividades
                      key={actividad.id}
                      curso={actividad.curso}
                      nombre={actividad.nombre}
                      fechaVencimiento={actividad.Fecha_vencimiento}
                      image={actividad.image}
                    ></MediaActividades>
                  ))}
                </ul>
              </div>
              <div className="col"></div>
              <div className="col-md-5 col-xl-6 col-12">
                <div className="row no-gutters pink">
                  <h2 className="mx-auto">Funcionalidad en desarrollo...</h2>
                  <hr></hr>
                  <h3 className="mx-auto">Tu imagen de perfil</h3>
                  <hr></hr>
                  <div className="profile mx-auto">
                    <div className="card cardProfile">
                      <div className="firstinfo" id="beforeProfileImage">
                        <img
                          src={userImg}
                          id="imgProfile"
                          alt="Imagen perfil"
                        />
                        <div className="profileinfo"></div>
                      </div>
                    </div>
                  </div>
                  <hr />
                  <h3 className="mx-auto">Califica nuestra plataforma</h3>
                  <hr />
                  <div className="mx-auto">
                    <Box component="fieldset" mb={3} borderColor="transparent">
                      <Rating
                        name="simple-controlled"
                        value={value}
                        size="large"
                        onChange={(event, newValue) => {
                          setValue(newValue);
                          actualizarCalificacion(newValue);
                        }}
                      />
                    </Box>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        <div>
          <div className="social-media-wrap">
            <small className="website-rights color--black-footer-home">
              Icons by Icons8 |
            </small>
            <small className="website-rights color--black-footer-home">
              &nbsp; Imágenes de cursos tomadas de: &nbsp;
              <a
                className="color--blue-footer-home"
                href="https://ichef.bbci.co.uk/news/410/cpsprodpb/164EE/production/_109347319_gettyimages-611195980.jpg"
              >
                ichef
              </a>
              , &nbsp;
              <a
                className="color--blue-footer-home"
                href="https://androidayuda.com/app/uploads-androidayuda.com/2020/07/apertura-juegos-quimica.jpg"
              >
                androidayuda
              </a>
              , &nbsp;
              <a
                className="color--blue-footer-home"
                href="https://concepto.de/wp-content/uploads/2018/08/f%C3%ADsica-e1534938838719.jpg"
              >
                concept.de
              </a>
            </small>
          </div>
        </div>
      </div>
    </main>
  );
}
