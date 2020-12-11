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
] = require("../controllers/actividades");
const [
  GetAllEntregas,
  addEntrega,
  addEntregaActividad,
  DeleteEntrega,
  UpdateEntrega,
  addImagen,
  GetAllSubmitions,
  GetAllEntregaEstudiante,
  GetSubmition
] = require("../controllers/entregas");

const [
  getStats, 
  getStatsSubject, 
  getStatsCourse, 
  insertStats,
  insertActivity,
  addSubmission,
  updateGrade,
  deleteSubmission,
  deleteActivity
] = require("../controllers/statisticsActivities");

//Get todas las entregas de la DB
router.get("/", async function (req, res, next) { 
  const entregas = await GetAllSubmitions();
  res.send(entregas);
});
//Get  la entregas con id
router.get("/:entregaId", async function (req, res, next) { 
  const entregas = await GetSubmition(req.params.entregaId);
  res.send(entregas);
});
//Get todas las entregas de una Actividad
router.get("/:actividadid/actividad", async function (req, res, next) {
  const entregas = await GetAllEntregas(req.params.actividadid);
  res.send(entregas);
});
//Get todas las entregas de un estudiante
router.get("/:estudianteId/estudiante", async function (req, res, next) {
  const estudiante = await GetAllEntregaEstudiante(req.params.estudianteId);
  res.send(estudiante);
});
// se crea una nueva entrega a una activida y estudiante especifico body submission
router.post("/:actividadid/entrega/:estudianteid", async function (req, res, next) {
  //body{submission:url}
  const entrega = await addEntrega(req.body, req.params.actividadid, req.params.estudianteid);
  const id = entrega.ops[0]._id;
  const getEntrega = await GetSubmition(id);
  const addSubmi = await addSubmission(getEntrega.activity);
  res.send(entrega);
});
router.post("/:entregaId", async function (req, res, next) {
  //{ "entrega": "url1" ,nombre :""]}
  const entrega = await addImagen(req.params.entregaId, req.body);
  res.send(entrega);
});
//Actuliza una entrega
router.put("/:entregaId/", async function (req, res, next) {
  const materia = await UpdateEntrega(req.body, req.params.entregaId);
  const getEntrega = await GetSubmition(req.params.entregaId);
  const updateActividad = await updateGrade(getEntrega.activity, getEntrega.grade);
  res.send(materia);
});
router.delete("/:entregaId", async function (req, res, next) {
  const actividad = await DeleteEntrega(req.params.entregaId);
  res.send(actividad);
});

module.exports = router;
