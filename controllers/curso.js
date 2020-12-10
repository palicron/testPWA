const { mongoUtils, dataBase } = require("../lib/utils/mongo");
const { ObjectId } = require("mongodb");
const COLLECTION_NAME = "courses";

function getCursos() {
  return mongoUtils.conn().then((client) => {
    return client
      .db(dataBase)
      .collection(COLLECTION_NAME)
      .find({})
      .toArray()
      .finally(() => client.close());
  });
}

function getCurso(cursoId) {
  return mongoUtils.conn().then((client) => {
    return client
      .db(dataBase)
      .collection(COLLECTION_NAME)
      .findOne({ _id: ObjectId(cursoId) })
      .finally(() => client.close());
  });
}

function getCursosOfADirector(teacherId) {
  return mongoUtils.conn().then((client) => {
    return client
      .db(dataBase)
      .collection(COLLECTION_NAME)
      .find({ teacher: ObjectId(teacherId) })
      .toArray()
      .finally(() => client.close());
  });
}

function getCursosOfATeacher(teacherId) {
  return mongoUtils.conn().then((client) => {
    return client
    .db(dataBase)
    .collection(COLLECTION_NAME)
    .aggregate([
      {
        $lookup:
        {
          from: "subjects",
          localField: "_id",
          foreignField: "course",
          as: "infoMaterias"
        }
      },
      {
        $project:
        {
          _id: 1,
          name: 1,
          image: 1,
          infoMaterias:
          {
            $filter:
            {
              input: "$infoMaterias",
              as: "materia",
              cond: { $eq: ["$$materia.teacher", ObjectId(teacherId) ] }
            }
          }
        }
      }
    ])
    .toArray()
    .finally(() => client.close());
  })
}

function insertCurso(newCurso) {
  return mongoUtils.conn().then((client) => {
    return client
      .db(dataBase)
      .collection(COLLECTION_NAME)
      .insertOne({
        name: newCurso.name,
        school: ObjectId(newCurso.school),
        image: newCurso.image,
        teacher: ObjectId(newCurso.teacher),
      })
      .finally(() => client.close());
  });
}

function updateCurso(cursoId, body) {
  return mongoUtils.conn().then((client) => {
    return client
      .db(dataBase)
      .collection(COLLECTION_NAME)
      .updateOne(
        {
          _id: ObjectId(cursoId),
        },
        {
          $set: {
            name: body.name,
            school: ObjectId(body.school),
            image: body.image,
            teacher: ObjectId(body.teacher),
          },
        },
      )
      .finally(() => client.close());
  });
}

function deleteCurso(cursoId) {
  return mongoUtils.conn().then((client) => {
    client
      .db(dataBase)
      .collection(COLLECTION_NAME)
      .deleteOne({ _id: ObjectId(cursoId) })
      .finally(() => client.close());
  });
}

module.exports = [
  getCursos,
  getCurso,
  getCursosOfADirector,
  getCursosOfATeacher,
  insertCurso,
  updateCurso,
  deleteCurso,
];
