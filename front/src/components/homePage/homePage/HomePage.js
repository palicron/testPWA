import React, { useEffect, useRef } from "react";
import NavbarHome from "../navbar/Navbar";
import Footer from "../footer/Footer";
import Section from "../section/Section";
import Header from "../header/Header";
import Carousel from "../carousel/Carousel";
import Main from "../main/Main";
import Description from "../description/Description";
import {
  descriptionObjOne_es,
  homeObjTwo_es,
  homeObjThree_es,
} from "./Data_es";
import {
  descriptionObjOne_en,
  homeObjTwo_en,
  homeObjThree_en,
} from "./Data_en";
import BotChat from "../chatavatar/BotChat";
import { useHistory } from "react-router-dom";
import "./HomePage.css";

function useKey(key, cb) {
  const callbackRef = useRef(cb);

  useEffect(() => {
    callbackRef.current = cb;
  });

  useEffect(() => {
    function handleKey(event) {
      if (event.code === key) {
        callbackRef.current(event);
      }
    }

    document.addEventListener("keypress", handleKey);
    return () => document.removeEventListener("keypress", handleKey);
  }, [key]);
}

export default function HomePage() {
  const history = useHistory();

  function handleHelp() {
    history.push("/helpPage");
  }

  function handleLogin() {
    history.push("/login");
  }

  function handleSingin() {
    history.push("/signin");
  }

  useKey("KeyH", handleHelp);
  useKey("KeyL", handleLogin);
  useKey("KeyS", handleSingin);

  let homeObjTwo = homeObjTwo_en;
  let descriptionObjOne = descriptionObjOne_en;
  let homeObjThree = homeObjThree_en;

  if (navigator.language.startsWith("es")) {
    homeObjTwo = homeObjTwo_es;
    descriptionObjOne = descriptionObjOne_es;
    homeObjThree = homeObjThree_es;
  }

  return (
    <>
      <div>
        <NavbarHome></NavbarHome>
        <main>
          <Header></Header>
          <Main></Main>
          <BotChat></BotChat>
          <Carousel></Carousel>
          <Section {...homeObjTwo}></Section>
          <Description {...descriptionObjOne} />
          <Section {...homeObjThree}></Section>
          <Footer></Footer>
        </main>
      </div>
    </>
  );
}
