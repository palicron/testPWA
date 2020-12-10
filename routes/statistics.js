var express = require("express");
var router = express.Router();

var [
    getStatsA, getStatsSubjectA, getStatsCourseA
] = require("../controllers/statisticsActivities");
var [
    getStatsS, getStatsSubjectS, getStatsCourseS
] = require("../controllers/statisticsStudents");

const statsLogic = require("../logic/estadisticasLogic");

router.get("/:idProfesor/:periodo", async function (req, res, next) {
    let idProfesor = req.params.idProfesor;
    let periodo = req.params.periodo;
    
    let qtys = [];
    let statsActivities = await getStatsA(periodo, idProfesor);
    let statsStudents = await getStatsS(periodo, idProfesor);

    if (statsActivities === null){
        return res
        .status(404)
        .send("There are no subjects registered in stats for period: " + periodo);
    }

    if (statsStudents == null ){
        return res
        .status(404)
        .send("There are no students registered in stats for period: " + periodo);
    }

    //Activity average
    let qtysActivityAverage = statsLogic.activityAverage(statsActivities);
    qtys.push({id: 1, cantidades: qtysActivityAverage});

    //Activity submissions
    let qtysActivitySubmissions = statsLogic.activitySubmissions(statsActivities, statsStudents, false);
    qtys.push({id: 2, cantidades: qtysActivitySubmissions});

    //Activity graded
    let qtysActivityGraded = statsLogic.activityGraded(statsActivities);
    qtys.push({id: 3, cantidades: qtysActivityGraded});

    //Student average
    qtys.push({id: 4, cantidades: [0,0,0,0]});

    //Student submission
    let qtysStudentSubmissions = statsLogic.studentSubmissions(statsStudents, statsActivities, idProfesor, -1);
    qtys.push({id: 5, qtysStudentSubmissions});
    
    res.send(qtys);
});

router.get("/:idProfesor/:periodo/:idCurso", async function (req, res, nect) {
    let idProfesor = req.params.idProfesor;
    let periodo = req.params.periodo;
    let curso = req.params.idCurso;

    let qtys = [];
    let statsActivities = await getStatsCourseA(periodo, curso, idProfesor);
    let statsStudents = await getStatsCourseS(periodo, curso);

    if (statsActivities == null) {
        return res
        .status(404)
        .send("There are no subjects registered in stats for period: " + periodo + " and teacher: " + idProfesor + " for the course: " + curso);
    }

    if (statsStudents == null) {
        return res
        .status(404)
        .send("There are no students registered in stats for period: " + periodo + " in the course: " + curso);
    }

    //Activity average
    let qtysActivityAverage = statsLogic.activityAverage(statsActivities);
    qtys.push({id: 1, cantidades: qtysActivityAverage});

    //Activity submissions
    let qtysActivitySubmissions = statsLogic.activitySubmissions(statsActivities, statsStudents, true);
    qtys.push({id: 2, cantidades: qtysActivitySubmissions});

    //Activity graded
    let qtysActivityGraded = statsLogic.activityGraded(statsActivities);
    qtys.push({id: 3, cantidades: qtysActivityGraded});

    //Student average
    qtys.push({id: 4, cantidades: [0,0,0,0]});

    //Student submission
    let qtysStudentSubmissions = statsLogic.studentSubmissions(statsStudents, statsActivities, idProfesor, -1);
    qtys.push({id: 5, qtysStudentSubmissions});

    res.send(qtys);
});

router.get("/:idProfesor/:periodo/:idCurso/:idMateria", async function(req, res, nect) {
    let idMateria = req.params.idMateria;
    let periodo = req.params.periodo;
    let idProfesor = req.params.idProfesor;

    let qtys = [];
    let statsActivities = await getStatsSubjectA(periodo, idMateria);
    let statsStudents = await getStatsSubjectS(periodo, idMateria);

    if (statsActivities == null) {
        return res
        .status(404)
        .send("There are no subjects registered in stats for period: " + periodo + " for the subject: " + idMateria);
    }

    if (statsStudents == null) {
        return res
        .status(404)
        .send("There are no students registered in stats for period: " + periodo + " in the subject: " + idMateria);
    }

    //Activity average
    let qtysActivityAverage = statsLogic.activityAverage(statsActivities);
    qtys.push({id: 1, cantidades: qtysActivityAverage});

    //Activity submissions
    let qtysActivitySubmissions = statsLogic.activitySubmissions(statsActivities, statsStudents, true);
    qtys.push({id: 2, cantidades: qtysActivitySubmissions});

    //Activity graded
    let qtysActivityGraded = statsLogic.activityGraded(statsActivities);
    qtys.push({id: 3, cantidades: qtysActivityGraded});

    //Student average
    let qtysStudentAverage = statsLogic.studentAverage(statsStudents, idMateria);
    qtys.push({id: 4, cantidades: qtysStudentAverage});

    //Student submission
    let qtysStudentSubmissions = statsLogic.studentSubmissions(statsStudents, statsActivities, idProfesor, idMateria);
    qtys.push({id: 5, cantidades: qtysStudentSubmissions});

    res.send(qtys);
});

module.exports = router;