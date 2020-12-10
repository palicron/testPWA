var express = require("express");
var router = express.Router();

var [
  getMaterias,
  getMateria,
  getMateriasOfATeacher,
  getMateriasOfATeacherAndACourse,
  getInfoMaterias,
  insertMateria,
  updateMateria,
  deleteMateria,
] = require("../controllers/materia");
const materiaLogic = require("../logic/materiaLogic");

router.get("/", async function (req, res, next) {
  const materias = await getMaterias();
  res.send(materias);
});

router.get("/:id", async function (req, res, next) {
  const materia = await getMateria(req.params.id);

  if (materia === null)
    return res
      .status(404)
      .send(
        "The materia with the given id was not found. " +
          req.params.id +
          typeof req.params.id,
      );

  res.send(materia);
});

router.get("/director/:id", async function (req, res, next) {
  const materia = await getMateriasOfATeacher(req.params.id);

  if (materia === null)
    return res
      .status(404)
      .send(
        "The materia with the given teacher id was not found. " +
          req.params.id +
          typeof req.params.id,
      );

  res.send(materia);
});

router.get("/teacher/:idT/course/:idC", async function (req, res, next) {
  const materia = await getMateriasOfATeacherAndACourse(
    req.params.idT,
    req.params.idC,
  );

  if (materia === null)
    return res
      .status(404)
      .send(
        "The materia with the given teacher id or course id was not found. " +
          req.params.id +
          typeof req.params.id,
      );

  res.send(materia);
});

router.get("/teacher/:id", async function (req, res, next) {
  const materias = await getInfoMaterias(req.params.id);
  const materiasProfesor = materias.filter(
    (materia) => materia.teacher == req.params.id,
  );
  res.send(materias);
});

router.post("/", async function (req, res, next) {
  const { error } = materiaLogic.validateMateria(req.body);

  if (error) {
    return res.status(400).send(error);
  }

  const newMateria = await insertMateria(req.body);
  res.send(newMateria);
});

router.put("/:id", async function (req, res) {
  const { error } = materiaLogic.validateMateria(req.body);

  if (error) {
    return res.status(400).send(error);
  }

  const materia = await getMateria(req.params.id);

  if (materia === null)
    return res.status(404).send("The materia was not found.");

  const newMateria = await updateMateria(req.params.id, req.body);
  res.send({ materia: "Materia updated" });
});

router.delete("/:id", async function (req, res) {
  const materia = await getMateria(req.params.id);

  if (materia === null)
    return res.status(404).send("The materia was not found.");

  const delMateria = await deleteMateria(req.params.id);
  res.status(204).send();
});

module.exports = router;
