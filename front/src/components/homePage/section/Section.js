import React from "react";
import { Link } from "react-router-dom";
import "./Section.css";
import { Button } from "../../button/Button";

export default function Section({
  lightBg,
  topLine,
  lightText,
  lightTextDesc,
  headLine,
  description,
  buttonLabel,
  imagen,
  alt,
  imgStart,
  id_container,
}) {
  return (
    <section id={id_container}>
      <div
        className={
          lightBg
            ? "home__hero-section__section"
            : "home__hero-section__section darkBg__section"
        }
      >
        <div className="container__section">
          <div
            className="row__section home__hero-row__section"
            style={{
              display: "flex",
              flexDirection: imgStart === "start" ? "row-reverse" : "row",
            }}
          >
            <div className="col__section">
              <div className="home__hero-text-wrapper__section">
                <div className="top-line__section">{topLine}</div>
                <h1 className={lightText ? "heading" : "heading dark__section"}>
                  {headLine}
                </h1>
                <p
                  className={
                    lightTextDesc
                      ? "home__hero-subttile__section"
                      : "home__hero-subtitle dark__section"
                  }
                >
                  {description}
                </p>
                <Link to="/signin">
                  <Button
                    buttonSize="btn--wide-button"
                    buttonColor="blue-button"
                  >
                    {buttonLabel}
                  </Button>
                </Link>
              </div>
            </div>
            <div className="col__section">
              <div className="home__hero-img-wrapper__section">
                <img
                  src={imagen}
                  alt={alt}
                  className="home__hero-img__section"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
