import React, { useState, lazy, Suspense } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
} from "react-router-dom";
import { AppProvider } from "./context/AppContext";

const NavBar = lazy(() => import("./components/navbar/NavBar"));
const HomePage = lazy(() => import("./components/homePage/homePage/HomePage"));
const Home = lazy(() => import("./components/home/Home"));
const Actividades = lazy(() => import("./components/actividades/Actividades"));
const Materias = lazy(() => import("./components/materias/Materias"));
const Entregas = lazy(() => import("./components/entregas/Entregas"));
const Calificaciones = lazy(() => import("./components/calificaciones/Calificaciones"));
const Estadisticas = lazy(() => import("./components/estadisticas/Estadisticas"));
const EditarActividad = lazy(() => import("./components/editarActividad/EditarActividad"));
const FormSignUp = lazy(() => import("./components/signup/FormSignUp"));
const SignIn = lazy(() => import("./components/signin/Form"));
const Help = lazy(() => import("./components/help/Help"));
const FailedLogin = lazy(() => import("./components/signin/FailedLogin"));


export default function App() {
  const [collapseNavBarStatus, setCollapseNavBarStatus] = useState("");

  const collapseNavbar = () => {
    if (collapseNavBarStatus) {
      setCollapseNavBarStatus("");
    } else {
      setCollapseNavBarStatus("active");
    }
  };

  return (
    <AppProvider>
      <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <div>
          <Switch>
            <Route path="/home">
              <NavBar collapseNavbar={collapseNavBarStatus}></NavBar>
              <Home collapseNavbar={collapseNavbar}></Home>
            </Route>
            
            <Route path="/" exact component={HomePage} />
            <Route path="/about">
              <About />
            </Route>
            <Route path="/topics">
              <Topics />
            </Route>
            <Route path="/estadisticas">
              <NavBar collapseNavbar={collapseNavBarStatus}></NavBar>
              <Estadisticas />
            </Route>
            <Route path="/signin">
              <FormSignUp />
            </Route>
            <Route exact path="/helpPage">
              <Help />
            </Route>
            <Route path="/FailedLogin">
              <FailedLogin />
            </Route>
            <Route path="/login">
              <SignIn />
            </Route>
            <Route path="/materias">
              <NavBar collapseNavbar={collapseNavBarStatus}></NavBar>
              <Materias collapseNavbar={collapseNavbar} />
            </Route>
            <Route
              exact
              path="/actividades"
              exact
              component={Actividades}
            >
              <NavBar collapseNavbar={collapseNavBarStatus}></NavBar>
              <Actividades />
            </Route>
            <Route exact path="/entregas">
              <NavBar collapseNavbar={collapseNavBarStatus}></NavBar>
              <Entregas />
            </Route>
            <Route exact path="/actividades/editar">
              <NavBar collapseNavbar={collapseNavBarStatus}></NavBar>
              <EditarActividad />
            </Route>
            <Route exact path="/calificaciones">
              <NavBar collapseNavbar={collapseNavBarStatus}></NavBar>
              <Calificaciones />
            </Route>
          </Switch>
        </div>
        </Suspense>
      </Router>
    </AppProvider>
  );
}

function About() {
  return <h2>About</h2>;
}

function Topics() {
  let match = useRouteMatch();

  return (
    <div>
      <h2>Topics</h2>

      <ul>
        <li>
          <Link to={`${match.url}/components`}>Components</Link>
        </li>
        <li>
          <Link to={`${match.url}/props-v-state`}>Props v. State</Link>
        </li>
      </ul>

      {/* The Topics page has its own <Switch> with more routes
          that build on the /topics URL path. You can think of the
          2nd <Route> here as an "index" page for all topics, or
          the page that is shown when no topic is selected */}
      <Switch>
        <Route path={`${match.path}/:topicId`}>
          <Topic />
        </Route>
        <Route path={match.path}>
          <h3>Please select a topic.</h3>
        </Route>
      </Switch>
    </div>
  );
}

function Topic() {
  let { topicId } = useParams();
  return <h3>Requested topic ID: {topicId}</h3>;
}
