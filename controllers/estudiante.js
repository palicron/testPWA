const { mongoUtils, dataBase } = require("../lib/utils/mongo");
const { ObjectId } = require("mongodb");
const COLLECTION_NAME = "users";

function getEstudiantes() {
  return mongoUtils.conn().then((client) => {
    return client
      .db(dataBase)
      .collection(COLLECTION_NAME)
      .find({ role: "student" })
      .toArray()
      .finally(() => client.close());
  });
}

function getEstudiante(estuId) {
  return mongoUtils.conn().then((client) => {
    return client
      .db(dataBase)
      .collection(COLLECTION_NAME)
      .findOne({ _id: ObjectId(estuId) })
      .finally(() => client.close());
  });
}

function getEstudianteByUsername(estuUsername) {
  return mongoUtils.conn().then((client) => {
    return client
      .db(dataBase)
      .collection(COLLECTION_NAME)
      .findOne({ username: estuUsername })
      .finally(() => client.close());
  });
}

function insertEstudiante(newEstudiante) {
  return mongoUtils.conn().then((client) => {
    return client
      .db(dataBase)
      .collection(COLLECTION_NAME)
      .insertOne({
        username: newEstudiante.username,
        firstName: newEstudiante.firstName,
        secondName: newEstudiante.secondName,
        lastName: newEstudiante.lastName,
        email: newEstudiante.email,
        role: "student",
        school: ObjectId(newEstudiante.school),
        course: ObjectId(newEstudiante.course),
        rating: newEstudiante.rating,
      })
      .finally(() => client.close());
  });
}

function updateEstudiante(estuId, body) {
  return mongoUtils.conn().then((client) => {
    return client
      .db(dataBase)
      .collection(COLLECTION_NAME)
      .updateOne(
        {
          _id: ObjectId(estuId),
        },
        {
          $set: {
            username: body.username,
            firstName: body.firstName,
            secondName: body.secondName,
            lastName: body.lastName,
            email: body.email,
            school: ObjectId(body.school),
            course: ObjectId(body.course),
            rating: body.rating,
          },
        },
      )
      .finally(() => client.close());
  });
}

function deleteEstudiante(estuId) {
  return mongoUtils.conn().then((client) => {
    client
      .db(dataBase)
      .collection(COLLECTION_NAME)
      .deleteOne({ _id: ObjectId(estuId) })
      .finally(() => client.close());
  });
}

module.exports = [
  getEstudiantes,
  getEstudiante,
  getEstudianteByUsername,
  insertEstudiante,
  updateEstudiante,
  deleteEstudiante,
];
