import React from "react";
import "./Description.css";

export default function Description({ description, id_container }) {
  return (
    <>
      <section
        id={id_container}
        className="bd-grid-as-description description-as-container"
      >
        <div className="text-as-description">
          <span className="font-size-as">{description}</span>
        </div>
      </section>
    </>
  );
}
