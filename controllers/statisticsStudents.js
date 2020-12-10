const { mongoUtils, dataBase } = require("../lib/utils/mongo");
const { ObjectId } = require("mongodb");
const COLLECTION_NAME = "statisticsStudents";

/**
 * Returns the student statistics of all students in an specific term taking a subject with an specific teacher
  * @param {Number of the term} periodo 
  * @param {Id of the teacher} idTeacher 
 */

function getStats(periodo, idTeacher) {
    return mongoUtils.conn().then((client) => {
        return client
        .db(dataBase)
        .collection(COLLECTION_NAME)
        .find({ periodo: periodo, materias:{ idProfesor: ObjectId(idTeacher) } } )
        .toArray()
        .finally(() => client.close());
    });
}

/**
 * Returns the student statistics of the students of an specific subject
 * @param {Number of the term} periodo 
 * @param {Id of the subject} subjectId 
 */

function getStatsSubject(periodo, subjectId) {
    return mongoUtils.conn().then((client) => {
        return client
        .db(dataBase)
        .collection(COLLECTION_NAME)
        .find({periodo: periodo, materias: { idMateria: ObjectId(subjectId) } } )
        .toArray()
        .finally(() => client.close());
    });
}

/**
 * Returns the student statistics of all students in an specific course
 * @param {Number of the term} periodo 
 * @param {Id of the course} courseId 
 */

function getStatsCourse(periodo, courseId) {
    return mongoUtils.conn().then((client) => {
        return client
        .db(dataBase)
        .collection(COLLECTION_NAME)
        .find({ periodo: periodo, curso: courseId })
        .toArray()
        .finally(() => client.close());
    });
}

/**
 * Creates the stats for a student
 * @param {Id of the student} idEstudiante 
 * @param {Id of the course} idCurso 
 * @param {Array with the Ids of the subjects in the course} materias 
 */

function insertStats(idEstudiante, idCurso, materias) {
    toInsert = [];
    materiasStats = [];

    materias.forEach(materia => {
        materiasStats.push({
            idMateria: ObjectId(materia),
            sumNotas: 0,
            totalNotas: 0,
            porcentajeNotas: 0,
            totalEntregas: 0
        });
    });

    for (i = 1; i <= 4; i++) {
        toInsert.push({
            periodo: i,
            estudiante: idEstudiante,
            curso: idCurso,
            materias: materiasStats
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
 * Represents the event of enrollment to a subject
 * @param {Number of the term} periodo 
 * @param {Id of the student} idStudent 
 * @param {Id of the subject} idSubject 
 */

function insertSubject(periodo, idStudent, idSubject) {
    newSubject = {
        idMateria: ObjectId(idSubject),
        sumNotas: 0,
        totalNotas: 0,
        porcentajeNotas: 0,
        totalEntregas: 0
    }

    return mongoUtils.conn().then((client) => {
        return client
        .db(dataBase)
        .collection(COLLECTION_NAME)
        .update(
            { periodo: periodo, estudiante: ObjectId(idStudent) },
            { $push: { materias: newSubject } }
        )
        .finally(() => client.close());
    });
}

/**
 * Represents the event of enrollment of all the students in a course to a subject
 * @param {Number of the term} periodo 
 * @param {Id of the course} idCourse 
 * @param {Id of the subject} idSubject 
 */

function insertManySubject(periodo, idCourse, idSubject) {
    newSubject = {
        idMateria: ObjectId(idSubject),
        sumNotas: 0,
        totalNotas: 0,
        porcentajeNotas: 0,
        totalEntregas: 0
    }

    return mongoUtils.conn().then((client) => {
        return client
        .db(dataBas)
        .collection(COLLECTION_NAME)
        .update(
            { periodo: periodo, curso: idCourse },
            { $push: { materias: newSubject } },
            { multi: true }
        )
        .finally(() => client.close());
    })
}

/**
 * Represents the event of a submission
 * @param {Number of the term} periodo 
 * @param {Id of the student} idStudent 
 * @param {Id of the subject} idSubject 
 */

function addSubmission(periodo, idStudent, idSubject) {
    return mongoUtils.conn().then((client) => {
        return client
        .db(dataBase)
        .collection(COLLECTION_NAME)
        .update(
            { periodo: periodo, estudiante: idStudent },
            { $inc: { "materias.$[elem].totalEntregas": 1 } },
            { arrayFilters: [ { "elem.idMateria": ObjectId(idSubject) } ] }
        )
        .finally(() => client.close());
    });
}

/**
 * Represents the event of grading an activity
 * @param {Number of the term} periodo 
 * @param {Id of the student} idStudent 
 * @param {Id of the subject} idSubject 
 * @param {Grade (newGrade - oldGrade)*percentage} grade 
 * @param {Percentage of the activity} percentage
 */

function updateGrade(periodo, idStudent, idSubject, grade, percentage) {
    return mongoUtils.conn().then((client) => {
        return client
        .db(dataBase)
        .collection(COLLECTION_NAME)
        .update(
            { periodo: periodo, estudiante: idStudent },
            { $inc: { "materias.$[elem].sumNotas": grade, "materias.$[elem].totalNotas": 1, "materias.$[elem].porcentajeNotas": percentage } },
            { arrayFilters: [ { "elem.idMateria": ObjectId(idSubject) } ] }
        )
        .finally(() => client.close());
    });
}

/**
 * 
 * @param {Number of the term} periodo 
 * @param {Id of the student} idStudent 
 * @param {Id of the subject} idSubject 
 * @param {Previous grade. -1 if it was not graded} grade 
 * @param {Percentage of the activity} percentage 
 */

function deleteSubmission(periodo, idStudent, idSubject, grade, percentage) {
    let decGrade = grade > -1? grade : 0;
    let decTotal = grade > -1? 1 : 0;
    let decPercentage = grade > -1? percentage : 0;
    
    return mongoUtils.conn().then((client) => {
        return client
        .db(dataBase)
        .collection(COLLECTION_NAME)
        .update(
            { periodo: periodo, estudiante: idStudent },
            { $inc: { "materias.$[elem].sumNotas": -decGrade, "materias.$[elem].totalNotas": -decTotal, "materias.$[elem].porcentajeNotas": -decPercentage, "materias.$[elem].totalEntregas": -1 } },
            { arrayFilters: [ { "elem.idMateria": ObjectId(idSubject) } ] }
        )
        .finally(() => client.close());
    });
}

module.exports = [
    getStats,
    getStatsSubject,
    getStatsCourse,
    insertStats,
    insertSubject,
    addSubmission,
    updateGrade,
    deleteSubmission
];