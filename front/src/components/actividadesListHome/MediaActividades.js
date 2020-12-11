import React, { useState, useEffect, useContext } from "react";
import "./MediaActividades.css";
import TareaImg from "../../assets/images/icons8-task-64.png";
import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import axios from "axios";
import { AppContext } from "../../context/AppContext";
import Loading from "../loading/Loading";

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

function ordenarActividadesFecha(data) {
  data.sort(ordenarPorPropiedad("submissionDate"));
}

export default function MediaActividades() {
  const [dataC, setData] = useContext(AppContext);

  const url_proxAct = "/omicron/materias/teacher/" + dataC.userId;
  const [proxActividades, setProxActividades] = useState(null);

  let loadingNextActivities = "Loading next activities";
  if (navigator.language.startsWith("es")) {
    loadingNextActivities = "Cargando próximas actividades";
  }
  useEffect(() => {
    if (!navigator.onLine) {
      if (sessionStorage.getItem("ActividadesProx") === "") {
        setProxActividades("Loading...");
      } else {
        setProxActividades(
          JSON.parse(sessionStorage.getItem("ActividadesProx")),
        );
      }
    } else {
      axios.get(url_proxAct).then((response) => {
        let dataProxActivities = [];
        response.data.map((proxA) => {
          if (proxA.infoActividades.length !== 0) {
            for (let i = 0; i < proxA.infoActividades.length; i++) {
              proxA.infoActividades[i].nameCourse = proxA.infoCurso.name;
              proxA.infoActividades[i].idCourse = proxA.infoCurso._id;
              proxA.infoActividades[i].nameSubject = proxA.name;
              proxA.infoActividades[i].idSubject = proxA._id;
              dataProxActivities.push(proxA.infoActividades[i]);
            }
          }
        });
        ordenarActividadesFecha(dataProxActivities);
        if (dataProxActivities.length > 5) {
          setProxActividades(dataProxActivities.slice(0, 5));
        } else {
          setProxActividades(dataProxActivities);
        }
        sessionStorage.setItem(
          "ActividadesProx",
          JSON.stringify(dataProxActivities),
        );
      });
    }
  }, [url_proxAct]);

  function handleClick(
    idCourse,
    nameCourse,
    idSubject,
    nameSubject,
    idAct,
    nameAct,
  ) {
    console.log(
      idCourse,
      1,
      nameCourse,
      2,
      idSubject,
      3,
      nameSubject,
      4,
      idAct,
      5,
      nameAct,
      6,
    );
    setData({
      ...dataC,
      idCourse: idCourse,
      nameCourse: nameCourse,
      idMateria: idSubject,
      nameMateria: nameSubject,
      idAct: idAct,
      nameAct: nameAct,
    });
  }

  let content = <Loading texto={loadingNextActivities}></Loading>;
  
  if (proxActividades) {
    content = proxActividades.map((proxA, index) => (
      <li className="media mb-4 d-flex mediaActivities" key={index}>
        <img
          src={TareaImg}
          className="align-self-center mx-3 mediaImage--size-20"
          alt={proxA.name}
        />

        <Link
          to="/entregas"
          className="nextActivitiesRef"
          onClick={handleClick.bind(
            null,
            proxA.idCourse,
            proxA.nameCourse,
            proxA.idSubject,
            proxA.nameSubject,
            proxA._id,
            proxA.name,
          )}
        >
          <div className="media-body py-2">
            <p className="mt-0 mb-0">
              <FormattedMessage id="course" />: {proxA.nameCourse} -{" "}
              {proxA.name} - {proxA.nameSubject}
            </p>
            <span className="mb-0">{proxA.submissionDate}</span>
          </div>
        </Link>
      </li>
    ));
  }

  return <>{content}</>;
}
