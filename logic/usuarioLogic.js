const Joi = require("joi");

const validateUsuario = (usuario) => {
  const schema = Joi.object({
    username: Joi.required(),
    firstName: Joi.required(),
    secondName: Joi.required(),
    lastName: Joi.required(),
    email: Joi.required(),
    role: Joi.required(),
    school: Joi.required(),
    rating: Joi.required(),
  });

  return schema.validate(usuario);
};

exports.validateUsuario = validateUsuario;