var express = require("express");
var router = express.Router();

var [
  getCursos,
  getCurso,
  getCursosOfADirector,
  getCursosOfATeacher,
  insertCurso,
  updateCurso,
  deleteCurso,
] = require("../controllers/curso");
var [
  getMaterias,
  getMateria,
  getMateriasOfATeacher,
  insertMateria,
  updateMateria,
  deleteMateria,
] = require("../controllers/materia");

const cursoLogic = require("../logic/cursoLogic");

router.get("/", async function (req, res, next) {
  const cursos = await getCursos();
  res.send(cursos);
});

router.get("/:id", async function (req, res, next) {
  const curso = await getCurso(req.params.id);

  if (curso === null)
    return res
      .status(404)
      .send("The curso with the given id was not found." + req.params.id);

  res.send(curso);
});

router.get("/directorTeacher/:id", async function (req, res, next) {
  const curso = await getCursosOfADirector(req.params.id);

  if (curso === null)
    return res
      .status(404)
      .send(
        "The curso with the given teacher id was not found." + req.params.id,
      );

  res.send(curso);
});

router.get("/teacher/:id", async function (req, res, next) {
  const cursos = await getCursosOfATeacher(req.params.id);
  res.send(cursos);
})

router.post("/", async function (req, res, next) {
  const { error } = cursoLogic.validateCurso(req.body);

  if (error) {
    return res.status(400).send(error);
  }

  const newCurso = await insertCurso(req.body);
  res.send(newCurso);
});

router.put("/:id", async function (req, res) {
  const { error } = cursoLogic.validateCurso(req.body);

  if (error) {
    return res.status(400).send(error);
  }

  const curso = await getCurso(req.params.id);

  if (curso === null) return res.status(404).send("The curso was not found.");

  const newCurso = await updateCurso(req.params.id, req.body);
  res.send({ curso: "curso updated" });
});

router.delete("/:id", async function (req, res) {
  const curso = await getCurso(req.params.id);

  if (curso === null) return res.status(404).send("The curso was not found.");

  const delCurso = await deleteCurso(req.params.id);
  res.status(204).send();
});

module.exports = router;
