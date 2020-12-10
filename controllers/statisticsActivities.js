const { mongoUtils, dataBase } = require("../lib/utils/mongo");
const { ObjectId } = require("mongodb");
const COLLECTION_NAME = "statisticsActivities";

 /**
  * Returns the activity statistics of all subjects in an specific term
  * @param {Number of the term} periodo 
  */

function getStats(periodo, idProfesor) {
    return mongoUtils.conn().then((client) => {
        return client
        .db(dataBase)
        .collection(COLLECTION_NAME)
        .find({ periodo: periodo, profesor: ObjectId(idProfesor) })
        .toArray()
        .finally(() => client.close());
    });
}

 /**
  * Returns the activity statistics of an specific subject in an specific term
  * @param {Number of the term} periodo 
  * @param {Id of the subject} subjectId 
  */

function getStatsSubject(periodo, subjectId) {
    return mongoUtils.conn().then((client) => {
        return client
        .db(dataBase)
        .collection(COLLECTION_NAME)
        .find({ periodo: periodo, materia: ObjectId(subjectId) })
        .toArray()
        .finally(() => client.close());
    });
}

 /**
  * Returns the activity statistics of all subjects in an specific course in an specific term 
  * @param {Number of the term} periodo 
  * @param {Id of the course} courseId 
  */

function getStatsCourse(periodo, courseId, idTeacher) {
    return mongoUtils.conn().then((client) => {
        return client
        .db(dataBase)
        .collection(COLLECTION_NAME)
        .find({ periodo: periodo, curso: courseId, profesor: ObjectId(idTeacher)})
        .toArray()
        .finally(() => client.close());
    });
}

/**
 * Creates the stats for a subject
 * @param {Id of the subject} idMateria 
 * @param {Id of the course} idCurso 
 */

function insertStats(idMateria, idCurso, idTeacher) {
    toInsert = [];

    for (i = 1; i <= 4; i++) {
        toInsert.push({
            periodo: "" + i,
            materia: idMateria,
            curso: idCurso,
            profesor: ObjectId(idTeacher),
            actividades: []
        });
    }

    return mongoUtils.conn().then((client) => {
        return client
        .db(dataBase)
        .collection(COLLECTION_NAME)
        .insertMany(toInsert)
        .finally(() => client.close());
    });
}

/**
 * 
 * @param {Number of the term} periodo 
 * @param {Id of the subject} idSubject 
 * @param {Id of the activity} idActivity 
 * @param {percentage of the activity} percentage
 */

function insertActivity(periodo, idSubject, idActivity, percentage) {
    newActivity = {
        idActividad: ObjectId(idActivity),
        sumNotas: 0,
        totalNotas: 0,
        porcentajeNotas: percentage,
        totalEntregas: 0
    }

    return mongoUtils.conn().then((client) => {
        return client
        .db(dataBase)
        .collection(COLLECTION_NAME)
        .update(
            { periodo: periodo, materia: ObjectId(idSubject) },
            { $push:{ actividades: newActivity } }
        )
        .finally(() => client.close());
    });
}

/**
 * Represents the event of a submission
 * @param {Number of the term} periodo 
 * @param {Id of the subject} idSubject 
 * @param {Id of the activity} idActivity 
 */

function addSubmission(idActivity) {
    return mongoUtils.conn().then((client) => {
        return client
        .db(dataBase)
        .collection(COLLECTION_NAME)
        .update(
            { },
            { $inc: { "actividades.$[elem].totalEntregas": 1 } },
            { arrayFilters: [ { "elem.idActividad": ObjectId(idActivity) } ] }
        )
        .finally(() => client.close());
    });
}

/**
 * Represents the event of grading
 * @param {Id of the activity} idActivity 
 * @param {Grade (newGrade - oldGrade)} grade 
 */

function updateGrade(idActivity, grade) {
    return mongoUtils.conn().then((client) => {
        return client
        .db(dataBase)
        .collection(COLLECTION_NAME)
        .update(
            { },
            { $inc: { "actividades.$[elem].sumNotas": grade, "actividades.$[elem].totalNotas": 1 } },
            { arrayFilters: [ { "elem.idActividad": ObjectId(idActivity) } ] }
        )
        .finally(() => client.close());
    });
}

/**
 * Represents the event of deleting a submission
 * @param {Id of the activity} idActivity
 * @param {Previous grade. -1 if it was not graded} grade 
 */

function deleteSubmission(idActivity, grade) {
    let decTotal = grade > -1? 1 : 0;
    let decGrade = grade > -1? grade : 0;

    return mongoUtils.conn().then((client) => {
        return client
        .db(dataBase)
        .collection(COLLECTION_NAME)
        .update(
            { },
            { $inc: { "actividades.$[elem].sumNotas": -decGrade, "actividades.$[elem].totalNotas": -decTotal, "actividades.$[elem].totalEntregas": -1 }},
            { arrayFilters: [ { "elem.idActividad": ObjectId(idActivity) } ] }
        )
        .finally(() => client.close());
    });
}

/**
 * Represents the event of deleting an activity
 * @param {Id of the activity} idActivity 
 */

function deleteActivity(idActivity) {
    return mongoUtils.conn().then((client) => {
        return client
        .db(dataBase)
        .collection(COLLECTION_NAME)
        .update(
            { },
            { $pull: { actividades: { idActividad: idActivity } } }
        )
        .finally(() => client.close());
    });
}

module.exports = [
    getStats,
    getStatsSubject,
    getStatsCourse,
    insertStats,
    insertActivity,
    addSubmission,
    updateGrade,
    deleteSubmission,
    deleteActivity
];