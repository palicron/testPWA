const { mongoUtils, dataBase } = require("../lib/utils/mongo");
const { ObjectId } = require("mongodb");
const COLLECTION_NAME = "users";

function getProfesores() {
  return mongoUtils.conn().then((client) => {
    return client
      .db(dataBase)
      .collection(COLLECTION_NAME)
      .find({ role: "teacher" })
      .toArray()
      .finally(() => client.close());
  });
}

function getProfesor(profesorId) {
  return mongoUtils.conn().then((client) => {
    return client
      .db(dataBase)
      .collection(COLLECTION_NAME)
      .findOne({ _id: ObjectId(profesorId) })
      .finally(() => client.close());
  });
}

function getIdProfesor(profesorUsername) {
  return mongoUtils.conn().then((client) => {
    return client
      .db(dataBase)
      .collection(COLLECTION_NAME)
      .findOne({ username: profesorUsername })
      .finally(() => client.close());
  });
}

function insertProfesor(newProfesor) {
  return mongoUtils.conn().then((client) => {
    return client
      .db(dataBase)
      .collection(COLLECTION_NAME)
      .insertOne({
        username: newProfesor.username,
        firstName: newProfesor.firstName,
        secondName: newProfesor.secondName,
        lastName: newProfesor.lastName,
        email: newProfesor.email,
        role: "teacher",
        school: ObjectId(newProfesor.school),
        rating: newProfesor.rating,
      })
      .finally(() => client.close());
  });
}

function updateProfesor(profesorId, body) {
  return mongoUtils.conn().then((client) => {
    return client
      .db(dataBase)
      .collection(COLLECTION_NAME)
      .updateOne(
        {
          _id: ObjectId(profesorId),
        },
        {
          $set: {
            username: body.username,
            firstName: body.firstName,
            secondName: body.secondName,
            lastName: body.lastName,
            email: body.email,
            school: ObjectId(body.school),
            rating: body.rating,
          },
        },
      )
      .finally(() => client.close());
  });
}

function deleteProfesor(profesorId) {
  return mongoUtils.conn().then((client) => {
    client
      .db(dataBase)
      .collection(COLLECTION_NAME)
      .deleteOne({ _id: ObjectId(profesorId) })
      .finally(() => client.close());
  });
}

module.exports = [
  getProfesores,
  getProfesor,
  insertProfesor,
  updateProfesor,
  deleteProfesor,
  getIdProfesor,
];
