import React from "react";
import CarouselT from "react-elastic-carousel";
import "./Carousel.css";
import German from "../../../assets/images/german.png";
import Angela from "../../../assets/images/angela.png";
import Nicolas from "../../../assets/images/nicolas.png";
import Juanse from "../../../assets/images/juanse.png";
import Sebastian from "../../../assets/images/sebastian.png";
import Cata from "../../../assets/images/cata.png";
import { FormattedMessage } from "react-intl";

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2, itemsToScroll: 2, pagination: false },
  { width: 850, itemsToShow: 3 },
  { width: 1150, itemsToShow: 4, itemsToScroll: 2 },
  { width: 1450, itemsToShow: 5 },
  { width: 1750, itemsToShow: 6 },
];

export default function Carousel() {
  return (
    <>
      <div className="team-text-as">
        <h2>
          {" "}
          <FormattedMessage id="landing.main.team.title" />
        </h2>
      </div>
      <section className="bd-grid-carousel">
        <div className="carousel-container-as">
          <CarouselT breakPoints={breakPoints}>
            <div className="item">
              <div>
                <img src={German} alt="German" />
                <p className="members-as-name">Germán Martínez </p>
              </div>
            </div>
            <div className="item">
              <div>
                <img src={Angela} alt="Angela profile pic" />
                <p className="members-as-name">Angela Suárez </p>
              </div>
            </div>
            <div className="item">
              <div>
                <img src={Cata} alt="Catalina Alcalá" />
                <p className="members-as-name">Catalina Alcalá </p>
              </div>
            </div>
            <div className="item">
              <div>
                <img src={Nicolas} alt="Nicolas profile pic" />
                <p className="members-as-name">Nicolás Hernández</p>
              </div>
            </div>
            <div className="item">
              <div>
                <img src={Juanse} alt="Sebastian" />
                <p className="members-as-name">Sebastián Clavijo </p>
              </div>
            </div>
            <div className="item">
              <div>
                <img src={Sebastian} alt="Sebastian profile pic" />
                <p className="members-as-name">Sebastián Palacios </p>
              </div>
            </div>
          </CarouselT>
        </div>
      </section>
    </>
  );
}
