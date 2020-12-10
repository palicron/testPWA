var express = require("express");
var router = express.Router();

var [
  getUsuarios,
  getUsuario,
  insertUsuario,
  updateUsuario,
  deleteUsuario,
] = require("../controllers/usuarios");

const usuarioLogic = require("../logic/usuarioLogic");

router.get("/", async function (req, res, next) {
  const usuarios = await getUsuarios();
  res.send(usuarios);
});

router.get("/:id", async function (req, res, next) {
  const usuario = await getUsuario(req.params.id);

  if (usuario === null)
    return res
      .status(404)
      .send(
        "The user with the given id was not found. " +
          req.params.id +
          typeof req.params.id,
      );

  res.send(usuario);
});

router.post("/", async function (req, res, next) {
  const { error } = usuarioLogic.validateUsuario(req.body);

  if (error) {
    return res.status(400).send(error);
  }

  const newUsuario = await insertUsuario(req.body);
  res.send(newUsuario);
});

router.put("/:id", async function (req, res) {
  const { error } = usuarioLogic.validateUsuario(req.body);

  if (error) {
    return res.status(400).send(error);
  }

  const usuario = await getUsuario(req.params.id);

  if (usuario === null)
    return res.status(404).send("The user was not found.");

  const newUsuario = await updateUsuario(req.params.id, req.body);
  res.send({ usuario: "user updated" });
});

router.delete("/:id", async function (req, res) {
  const usuario = await getUsuario(req.params.id);

  if (usuario === null)
    return res.status(404).send("The user was not found.");

  const delUsuario = await deleteUsuario(req.params.id);
  res.status(204).send();
});

module.exports = router;
