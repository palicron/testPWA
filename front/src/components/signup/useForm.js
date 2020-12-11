import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const useFormSignup = (callback, validate) => {
  const [values, setValues] = useState({
    username: "",
    firstName: "",
    secondName: "",
    lastName: "",
    rol: "",
    school: "",
    email: "",
    password: "",
    password2: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [count, setCount] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validate(values));
    setIsSubmitting(true);
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const fetch = () => {
    let firstNameS = values.firstName;
    let secondNameS = values.secondName;
    let lastNameS = values.lastName;
    let emailS = values.email;
    let roleS = values.rol;
    let schoolS = "5fa86ca13dfdc1f5996ce534";
    let ratingS = 0;
    let usernameS = values.username;

    axios
      .post("/omicron/usuarios/", {
        username: usernameS,
        firstName: firstNameS,
        secondName: secondNameS,
        lastName: lastNameS,
        email: emailS,
        role: roleS,
        school: schoolS,
        rating: ratingS,
      })
      .then((response) => {
        console.log(response);
        history.push("/login");
      })
      .catch((e) => {
        console.log(e);
        history.push("/");
      });
  };
  
  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      callback();
      fetch();
    }
  }, [errors]);

  return { handleChange, values, handleSubmit, errors };
};

export default useFormSignup;
