const Joi = require("joi");

const validateMateria = (materia) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    teacher: Joi.required(),
    course: Joi.required(),
    image: Joi.required(),
  });

  return schema.validate(materia);
};

exports.validateMateria = validateMateria;
