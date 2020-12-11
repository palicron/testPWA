import React from "react";
import Chart from "react-google-charts";
import noStats from "../../assets/images/pocoyo.png";

export default function PieChartEstadisticas(props) {
  let data1 = [props.param1, props.data1];
  let data2 = [props.param2, props.data2];
  let data3 = [props.param3, props.data3];
  let data4 = [props.param4, props.data4];
  let nombre = props.nombre;
  let categoria = props.categoria;
  return (
    <>
      {(data1[1] === 0 && data2[1] === 0 && data3[1] === 0 && data4[1] === 0)? ( 
        <div>
        <img
        src={noStats}
        alt="No hay estadisticas"
        width={"120px"}
        className="align-self-center mb-3"
        />
        <br></br>
        <p>No hay suficiente información</p>
        </div>
        ) : (
      <Chart
        width={"400px"}
        height={"250px"}
        chartType="PieChart"
        loader={<div>Loading Chart</div>}
        data={[[nombre, categoria], data1, data2, data3, data4]}
        rootProps={{ "data-testid": "1" }}
      />
        )}
    </>
  );
}
