const Joi = require("joi");

const validateProfesor = (profesor) => {
  const schema = Joi.object({
    username: Joi.required(),
    firstName: Joi.required(),
    secondName: Joi.required(),
    lastName: Joi.required(),
    email: Joi.required(),
    school: Joi.required(),
    role: Joi.required(),
    rating: Joi.required(),
  });

  return schema.validate(profesor);
};

exports.validateProfesor = validateProfesor;
