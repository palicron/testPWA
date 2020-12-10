const Joi = require("joi");

const validateEstudiante = (estudiante) => {
  const schema = Joi.object({
    username: Joi.required(),
    firstName: Joi.required(),
    secondName: Joi.required(),
    lastName: Joi.required(),
    email: Joi.required(),
    school: Joi.required(),
    course: Joi.required(),
    rating: Joi.required(),
  });

  return schema.validate(estudiante);
};

exports.validateEstudiante = validateEstudiante;
