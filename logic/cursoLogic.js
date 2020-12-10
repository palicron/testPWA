const Joi = require("joi");

const validateCurso = (materia) => {
  const schema = Joi.object({
    name: Joi.required(),
    school: Joi.required(),
    image: Joi.required(),
    teacher: Joi.required(),
  });

  return schema.validate(materia);
};

exports.validateCurso = validateCurso;
