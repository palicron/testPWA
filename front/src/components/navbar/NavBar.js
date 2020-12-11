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
import { FormattedMessage } from "react-intl";

export default function NavBar(props) {
  const [dataC, setDataC] = useContext(AppContext);
  const [groups, setGroups] = useState(null);

  const url = "/omicron/usuarios/" + dataC.userId;
  const url_cursos = "/omicron/cursos/teacher/" + dataC.userId;

  const [userData, setUserData] = useState(null);
  let loadingNextActivities = "Loading groups";
  if (navigator.language.startsWith("es")) {
    loadingNextActivities = "Cargando grupos";
  }

  useEffect(() => {
    if (!navigator.onLine) {
      if (sessionStorage.getItem("UserData") === "") {
        setUserData("Loading...");
      } else {
        setUserData(JSON.parse(sessionStorage.getItem("UserData")));
      }
      if (sessionStorage.getItem("Groups") === "") {
        setGroups("Loading...");
      } else {
        setGroups(JSON.parse(sessionStorage.getItem("Groups")));
      }
    } else {
      axios
        .get(url)
        .then((response) => {
          // Obtenemos los datos
          console.log(response.data);
          setUserData(response.data);
          sessionStorage.setItem("UserData", JSON.stringify(response.data));
        })
        .catch((e) => {
          // Capturamos los errores
          console.log(e);
        });
      axios.get(url_cursos).then((response) => {
        let dataGroups = [];
        response.data.map((group) => {
          if (group.infoMaterias.length !== 0) {
            for (let i = 0; i < group.infoMaterias.length; i++) {
              group.infoMaterias[i].nameCourse = group.name;
              group.infoMaterias[i].idCourse = group._id;
              group.infoMaterias[i].nameSubject = group.infoMaterias[i].name;
              group.infoMaterias[i].idSubject = group.infoMaterias[i]._id;
              dataGroups.push(group.infoMaterias[i]);
            }
          }
        });
        if (dataGroups.length > 8) {
          setGroups(dataGroups.slice(0, 8));
        } else {
          setGroups(dataGroups);
        }
        sessionStorage.setItem("Groups", JSON.stringify(dataGroups));
      });
    }
  }, [url, url_cursos]);

  let content = <Loading texto={loadingNextActivities}></Loading>;

  function handleClick(idCourse, nameCourse, idSubject, nameSubject) {
    console.log(idCourse, 1, nameCourse, 2, idSubject, 3, nameSubject, 4);
    setDataC({
      ...dataC,
      idCourse: idCourse,
      nameCourse: nameCourse,
      idMateria: idSubject,
      nameMateria: nameSubject,
    });
  }

  if (groups) {
    console.log(groups);
    content = groups.map((group, index) => (
      <li className="nav-item" key={index}>
        <Link
          to="/actividades"
          className="nav-link text-dark font-italic listitem--hover-background"
          onClick={handleClick.bind(
            null,
            group.idCourse,
            group.nameCourse,
            group.idSubject,
            group.nameSubject,
          )}
        >
          <img
            src={classroom64Img}
            className="mr-3 icon-width-30px"
            alt="Icono aula 2"
          />
          {group.nameSubject} - {group.nameCourse}
        </Link>
      </li>
    ));
  }

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
          Menu
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
              <FormattedMessage id="statistics" />
            </Link>
          </li>
        </ul>

        <p className="text-gray font-weight-bold text-uppercase px-3 small py-4 mb-0">
          <FormattedMessage id="groups" />
        </p>

        <ul className="nav flex-column flex-grow-1 bg-white mb-0">{content}</ul>

        <Link
          to="/"
          className="nav-link text-dark mt-5 listitem--hover-background"
        >
          <img
            src={salida64Img}
            className="mr-3 icon-width-30px"
            alt="Icono salida"
          />
          <FormattedMessage id="log.out" />
        </Link>
      </div>
    </header>
  );
}
