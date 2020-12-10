import React from "react";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AppContext } from "../../context/AppContext";
import { useHistory } from "react-router-dom";

const useForm = (callback, validate) => {
  const history = useHistory();
  const [dataC, setDataC] = useContext(AppContext);

  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    let username = e.target.email.value;
    axios
      .get("/omicron/profesores/login/" + username)
      .then((response) => {
        // Obtenemos los datos
        setDataC({ ...dataC, userId: response.data._id });
        console.log("datitos " +dataC);
        history.push("/home");
      })
      .catch((e) => {
        // Capturamos los errores
        console.log(e);
        history.push("/FailedLogin");
      });
  
    e.preventDefault();
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      callback();
    }
  }, [errors]);

  return { handleChange, handleSubmit, values, errors };
};

export default useForm;
