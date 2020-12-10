var express = require("express");
var router = express.Router();
const [
  GetAllEntregas,
  addEntrega,
  addEntregaActividad,
  DeleteEntrega,
  UpdateEntrega,
  addImagen,
  GetAllSubmitions,
  GetAllEntregaEstudiante,
  GetSubmition,
] = require("../controllers/entregas");

const [
  getEstudiantes,
  getEstudiante,
  getEstudianteByUsername,
  insertEstudiante,
  updateEstudiante,
  deleteEstudiante,
] = require("../controllers/estudiante");

router.post("/", async function (req, res, next) {
  let actividadId = "5fa87b483dfdc1f5996ce53c";
  console.log(req.body.student_username + " body");
  const estudiante = await getEstudianteByUsername(req.body.student_username);

  req.body.submission = req.body.files_id[0];

  const entrega = await addEntrega(req.body, actividadId, estudiante._id);
  res.send(entrega);

  console.log(req.body.files_id[0]);
});

module.exports = router;
