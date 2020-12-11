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

    let firstNameS = e.target.firstName.value;
    let secondNameS = e.target.secondName.value;
    let lastNameS = e.target.lastName.value;
    let emailS = e.target.email.value;
    let roleS = e.target.rol.value;
    let schoolS = "5fa86ca13dfdc1f5996ce534";
    let ratingS = 0;
    let usernameS = e.target.username.value;

    if (isSubmitting === true) {
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
    }
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      callback();
    }
  }, [errors]);

  return { handleChange, values, handleSubmit, errors };
};

export default useFormSignup;
