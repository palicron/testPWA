var express = require("express");
var router = express.Router();

var [
  getProfesores,
  getProfesor,
  insertProfesor,
  updateProfesor,
  deleteProfesor,
  getIdProfesor
] = require("../controllers/profesor");
const profesorLogic = require("../logic/profesorLogic");
const profesor = require("../controllers/profesor");

router.get("/", async function (req, res, next) {
  const profesores = await getProfesores();
  res.send(profesores);
});

router.get("/:id", async function (req, res, next) {
  const profesor = await getProfesor(req.params.id);
  if (profesor === null)
    return res.status(404).send("The teacher with the given id was not found.");

  res.send(profesor);
});

router.get("/login/:username", async function (req, res, next) {
  const profesor = await getIdProfesor(req.params.username);
  if (profesor === null)
    return res.status(404).send("The teacher with the given email was not found.");

  res.send(profesor);
});

router.post("/", async function (req, res, next) {
  const { error } = profesorLogic.validateProfesor(req.body);

  if (error) return res.status(400).send(error);

  const newProfesor = await insertProfesor(req.body);
  res.send(newProfesor);
});

router.put("/:id", async function (req, res) {
  const { error } = profesorLogic.validateProfesor(req.body);

  if (error) return res.status(400).send(error);

  const profesor = await getProfesor(req.params.id);

  if (profesor === null)
    return res.status(404).send("The teacher was not found.");

  const newProfesor = await updateProfesor(req.params.id, req.body);
  res.send({ newProfesor: "Profesor updated" });
});

router.delete("/:id", async function (req, res) {
  const profesor = await getProfesor(req.params.id);

  if (profesor === null)
    return res.status(404).send("The teacher was not found");

  const delProfesor = await deleteProfesor(req.params.id);
  res.status(204).send();
});

module.exports = router;
