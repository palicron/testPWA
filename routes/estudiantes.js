var express = require("express");
var router = express.Router();

var [
  getEstudiantes,
  getEstudiante,
  getEstudianteByUsername,
  insertEstudiante,
  updateEstudiante,
  deleteEstudiante,
] = require("../controllers/estudiante");
const estudianteLogic = require("../logic/estudianteLogic");

router.get("/", async function (req, res, next) {
  const estudiantes = await getEstudiantes();
  res.send(estudiantes);
});

router.get("/:id", async function (req, res, next) {
  const estudiante = await getEstudiante(req.params.id);

  if (estudiante === null)
    return res
      .status(404)
      .send("The estudiante with the given id was not found." + req.params.id);

  res.send(estudiante);
});

router.post("/", async function (req, res, next) {
  const { error } = estudianteLogic.validateEstudiante(req.body);

  if (error) {
    return res.status(400).send(error);
  }

  const newEstudiante = await insertEstudiante(req.body);
  res.send(newEstudiante);
});

router.put("/:id", async function (req, res) {
  const { error } = estudianteLogic.validateEstudiante(req.body);

  if (error) {
    return res.status(400).send(error);
  }

  const estudiante = await getEstudiante(req.params.id);

  if (estudiante === null)
    return res.status(404).send("The estudiante was not found.");

  const newEstudiante = await updateEstudiante(req.params.id, req.body);
  res.send({ estudiante: "estudiante updated" });
});

router.delete("/:id", async function (req, res) {
  const estudiante = await getEstudiante(req.params.id);

  if (estudiante === null)
    return res.status(404).send("The estudiante was not found.");

  const delEstudiante = await deleteEstudiante(req.params.id);
  res.status(204).send();
});

module.exports = router;
