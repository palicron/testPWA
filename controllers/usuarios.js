const { mongoUtils, dataBase } = require("../lib/utils/mongo");
const { ObjectId } = require("mongodb");
const COLLECTION_NAME = "users";

function getUsuarios() {
  return mongoUtils.conn().then((client) => {
    return client
      .db(dataBase)
      .collection(COLLECTION_NAME)
      .find({})
      .toArray()
      .finally(() => client.close());
  });
}

function getUsuario(usuarioId) {
  return mongoUtils.conn().then((client) => {
    return client
      .db(dataBase)
      .collection(COLLECTION_NAME)
      .findOne({ _id: ObjectId(usuarioId) })
      .finally(() => client.close());
  });
}

function insertUsuario(newUsuario) {
  return mongoUtils.conn().then((client) => {
    return client
      .db(dataBase)
      .collection(COLLECTION_NAME)
      .insertOne({
        username: newUsuario.username,
        firstName: newUsuario.firstName,
        secondName: newUsuario.secondName,
        lastName: newUsuario.lastName,
        email: newUsuario.email,
        role: newUsuario.role,
        school: ObjectId(newUsuario.school),
        course: ObjectId(newUsuario.course),
        rating: newUsuario.rating,
      })
      .finally(() => client.close());
  });
}

function updateUsuario(usuarioId, body) {
  return mongoUtils.conn().then((client) => {
    return client
      .db(dataBase)
      .collection(COLLECTION_NAME)
      .updateOne(
        {
          _id: ObjectId(usuarioId),
        },
        {
          $set: {
            username: body.username,
            firstName: body.firstName,
            secondName: body.secondName,
            lastName: body.lastName,
            email: body.email,
            role: body.role,
            school: ObjectId(body.school),
            course: ObjectId(body.course),
            rating: body.rating,
          },
        },
      )
      .finally(() => client.close());
  });
}

function deleteUsuario(usuarioId) {
  return mongoUtils.conn().then((client) => {
    client
      .db(dataBase)
      .collection(COLLECTION_NAME)
      .deleteOne({ _id: ObjectId(usuarioId) })
      .finally(() => client.close());
  });
}

module.exports = [
  getUsuarios,
  getUsuario,
  insertUsuario,
  updateUsuario,
  deleteUsuario,
];
