import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import userImg from "../../assets/images/icons8-user-male-512.png";
import squaredMenu64Img from "../../assets/images/icons8-squared-menu-64.png";
import doughnutChart48Img from "../../assets/images/icons8-doughnut-chart-48.png";
import classroom64Img from "../../assets/images/icons8-classroom-64.png";
import salida64Img from "../../assets/images/icons8-salida-64.png";
import "./NavBar.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import Loading from "../loading/Loading";

export default function NavBar(props) {
  const [data] = useContext(AppContext);
  console.log(data);

  const url = "/omicron/usuarios/" + data.userId;

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (!navigator.onLine) {
      if (sessionStorage.getItem("UserData") === "") {
        setUserData("Loading...");
      } else {
        setUserData(JSON.parse(sessionStorage.getItem("UserData")));
      }
    } else {
      axios
        .get(url)
        .then((response) => {
          // Obtenemos los datos
          console.log(response.data);
          setUserData(response.data);
          sessionStorage.setItem("UserData",JSON.stringify(response.data));
        })
        .catch((e) => {
          // Capturamos los errores
          console.log(e);
        });
    }
  }, [url]);

  return (
    <header>
      <div
        className={`vertical-nav bg-white ${props.collapseNavbar}`}
        id="sidebar"
      >
        <div className="py-4 px-3 mb-4 bg-light">
          <div className="media d-flex align-items-center">
            <img
              src={userImg}
              alt="Imagen de perfil"
              className="mr-3 rounded-circle img-thumbnail shadow-sm icon--width-30"
            />
            <div className="media-body">
              <h2 className="m-0 text--name-sidebar" id="userName">
                {userData == null ? (
                  <Loading texto="Cargando usuario..."></Loading>
                ) : (
                  userData.firstName
                )}
              </h2>
              <p className="mb-0 color--gray-navbar">
                {userData == null ? <></> : userData.lastName}
              </p>
            </div>
          </div>
        </div>

        <p className="text-gray font-weight-bold text-uppercase px-3 small pb-4 mb-0">
          Menú
        </p>

        <ul className="nav flex-column bg-white mb-0">
          <li className="nav-item">
            <Link
              to="/home"
              className="nav-link text-dark font-italic listitem--hover-background"
            >
              <img
                src={squaredMenu64Img}
                className="mr-3 icon-width-30px"
                alt="Icono salida"
              />
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/estadisticas"
              className="nav-link text-dark font-italic listitem--hover-background"
            >
              <img
                src={doughnutChart48Img}
                className="mr-3 icon-width-30px"
                alt="Icono gráfico anillos"
              />
              Estadísticas
            </Link>
          </li>
        </ul>

        <p className="text-gray font-weight-bold text-uppercase px-3 small py-4 mb-0">
          Grupos
        </p>

        <ul className="nav flex-column flex-grow-1 bg-white mb-0">
          <li className="nav-item">
            <Link
              to="/actividades"
              className="nav-link text-dark font-italic listitem--hover-background"
            >
              <img
                src={classroom64Img}
                className="mr-3 icon-width-30px"
                alt="Icono aula 2"
              />
              Física 5A
            </Link>
          </li>
        </ul>

        <Link
          to="/"
          className="nav-link text-dark mt-5 listitem--hover-background"
        >
          <img
            src={salida64Img}
            className="mr-3 icon-width-30px"
            alt="Icono salida"
          />
          Salir
        </Link>
      </div>
    </header>
  );
}
