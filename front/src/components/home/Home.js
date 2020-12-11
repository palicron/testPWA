import React, { useRef, useContext, useState, useEffect } from "react";
import userImg from "../../assets/images/icons8-user-male-512.png";
import "./Home.css";
import MediaActividades from "../actividadesListHome/MediaActividades";
import Curso from "./Curso";
import Rating from "@material-ui/lab/Rating";
import Box from "@material-ui/core/Box";
import axios from "axios";
import { AppContext } from "../../context/AppContext";
import { FormattedMessage } from "react-intl";

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
                <h2 className="mb-4">
                  <FormattedMessage id="home.next.activities" />
                </h2>
                <ul className="list-unstyled" id="allNextActivities">
                  <MediaActividades />
                </ul>
              </div>
              <div className="col"></div>
              <div className="col-md-5 col-xl-6 col-12">
                <div className="row no-gutters pink">
                  <h2 className="mx-auto">
                    <FormattedMessage id="home.develop.function" />
                  </h2>
                  <hr className="hr-nocolor" />
                  <h3 className="mx-auto">
                    <FormattedMessage id="home.profile" />
                  </h3>
                  <hr className="hr-nocolor" />
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
                  <hr className="hr-nocolor" />
                  <h3 className="mx-auto">
                    <FormattedMessage id="home.rate" />
                  </h3>
                  <hr className="hr-nocolor" />
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
              &nbsp; <FormattedMessage id="home.footer.references" /> &nbsp;
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
