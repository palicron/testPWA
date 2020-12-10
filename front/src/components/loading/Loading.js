import React, { useState, useEffect, useRef, useContext } from "react";
import "./Loading.css";
import { Ring } from "react-awesome-spinners";
export default function Loading({ texto }) {
  return (
    <>
      <div className=" center  col-12">
        <Ring color="#018786" size="70" />
      </div>
      <div className="col-12">
        <h5 className="center mt-5">{texto}</h5>
      </div>
    </>
  );
}
