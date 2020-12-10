const { mongoUtils, dataBase } = require("../lib/utils/mongo");
const { ObjectId } = require("mongodb");
const COLLECTION_NAME = "subjects";

function getMaterias() {
  return mongoUtils.conn().then((client) => {
    return client
      .db(dataBase)
      .collection(COLLECTION_NAME)
      .find({})
      .toArray()
      .finally(() => client.close());
  });
}

function getMateria(materiaId) {
  return mongoUtils.conn().then((client) => {
    return client
      .db(dataBase)
      .collection(COLLECTION_NAME)
      .findOne({ _id: ObjectId(materiaId) })
      .finally(() => client.close());
  });
}

function getMateriasOfATeacher(teacherId) {
  return mongoUtils.conn().then((client) => {
    return client
      .db(dataBase)
      .collection(COLLECTION_NAME)
      .find({ teacher: ObjectId(teacherId) })
      .toArray()
      .finally(() => client.close());
  });
}

function getMateriasOfATeacherAndACourse(teacherId, courseId) {
  return mongoUtils.conn().then((client) => {
    return client
      .db(dataBase)
      .collection(COLLECTION_NAME)
      .find({ teacher: ObjectId(teacherId), course: ObjectId(courseId) })
      .toArray()
      .finally(() => client.close());
  });
}

function getInfoMaterias(idProfesor) {
  return mongoUtils.conn().then((client) => {
    return client
      .db(dataBase)
      .collection(COLLECTION_NAME)
      .aggregate([
        {
          $match: { teacher: ObjectId(idProfesor) },
        },
        {
          $lookup: {
            from: "activities",
            localField: "_id",
            foreignField: "subject",
            as: "infoActividades",
          },
        },
        {
          $lookup: {
            from: "courses",
            localField: "course",
            foreignField: "_id",
            as: "infoCurso",
          },
        },
        {
          $unwind: "$infoCurso",
        },
        {
          $project: {
            _id: 1,
            name: 1,
            teacher: 1,
            "infoActividades._id": 1,
            "infoActividades.name": 1,
            "infoActividades.submissionDate": 1,
            "infoCurso._id": 1,
            "infoCurso.name": 1,
            "infoCurso.image": 1,
          },
        },
      ])
      .toArray()
      .finally(() => client.close());
  });
}

function insertMateria(newMateria) {
  return mongoUtils.conn().then((client) => {
    return client
      .db(dataBase)
      .collection(COLLECTION_NAME)
      .insertOne({
        name: newMateria.name,
        teacher: ObjectId(newMateria.teacher),
        course: ObjectId(newMateria.course),
        image: newMateria.image,
      })
      .finally(() => client.close());
  });
}

function updateMateria(materiaId, body) {
  return mongoUtils.conn().then((client) => {
    return client
      .db(dataBase)
      .collection(COLLECTION_NAME)
      .updateOne(
        {
          _id: ObjectId(materiaId),
        },
        {
          $set: {
            name: body.name,
            teacher: ObjectId(body.teacher),
            course: ObjectId(body.course),
            image: body.image,
          },
        },
      )
      .finally(() => client.close());
  });
}

function deleteMateria(materiaId) {
  return mongoUtils.conn().then((client) => {
    client
      .db(dataBase)
      .collection(COLLECTION_NAME)
      .deleteOne({ _id: ObjectId(materiaId) })
      .finally(() => client.close());
  });
}

module.exports = [
  getMaterias,
  getMateria,
  getMateriasOfATeacher,
  getMateriasOfATeacherAndACourse,
  getInfoMaterias,
  insertMateria,
  updateMateria,
  deleteMateria,
];
