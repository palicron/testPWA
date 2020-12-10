const express = require("express");
const router = express.Router();

const [
  getMateria,
  getAllactividades,
  GetActividad,
  addAvtividad,
  UpDateActividad,
  DeleteActividad,
  AddActividaAMateria,
  GetAllActividades,
  GetSubjetActivitis
] = require("../controllers/actividades");

// Get all actividades en el db
router.get("/", async function (req, res, next) {
  const Actividades = await GetAllActividades();
  res.send(Actividades);
});

// Get all actividades con Id
router.get("/:ActividadId", async function (req, res, next) {
  const Actividade = await GetActividad(req.params.ActividadId);
  res.send(Actividade);
});
// Get activida por materia
router.get("/:subjectId/subject", async function (req, res, next) {
  const Actividade = await GetSubjetActivitis(req.params.subjectId);
  res.send(Actividade);
});

//POst agrega una actividad
router.post("/:Materiaid/createActivity", async function (req, res, next) {
  const materia = await addAvtividad(req.body, req.params.Materiaid);
  const id = materia.ops[0]._id;
  res.send(id);
});
//PUT actulisa una actividad 
router.put("/:actividadid", async function (req, res, next) {
  const materia = await UpDateActividad(req.body, req.params.actividadid);
  res.send(materia);
});
//DELETE elimina una actividad 
router.delete("/:actividadid", async function (req, res, next) {
  const actividad = await DeleteActividad(
    req.params.actividadid
  );
  res.send(actividad);
});

module.exports = router;
