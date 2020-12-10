import React, { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = (props) => {
  const [data, setData] = useState({
    userId: "5fa86a303dfdc1f5996ce52f",
    idAct: "5fa87b483dfdc1f5996ce53c",
    idCourse: "5fa86e293dfdc1f5996ce536",
    idMateria: "5fa87a9593b667a5cb35b207",
    nameCourse: "5A",
    nameMateria: "Física",
    idEntrega: "5fa877463dfdc1f5996ce53a",
    nameAct: "Actividad gatos",
  });

  return (
    <AppContext.Provider value={[data, setData]}>
      {props.children}
    </AppContext.Provider>
  );
};
