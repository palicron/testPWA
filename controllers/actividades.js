const { mongoUtils, dataBase } = require("../lib/utils/mongo");
const { ObjectId } = require("mongodb");
const COLLECTION_MATERIA = "subjects";
const COLLECTION_ACTIVIDAD = "activities";

function getMateria(id) {
  return mongoUtils.conn().then((client) => {
    try {
      return client
        .db(dataBase)
        .collection(COLLECTION_MATERIA)
        .findOne({ _id: ObjectId(id) })
        .finally(() => client.close());
    } catch (error) {
      return error;
    }
  });
}

// devuelve todas las actividades en el DB
function GetAllActividades() {
  return mongoUtils.conn().then((client) => {
    try {
      return client
        .db(dataBase)
        .collection(COLLECTION_ACTIVIDAD)
        .find({})
        .toArray()
        .finally(() => client.close());
    } catch (error) {
      return error;
    }
  });
}
//Devuelve un actividad por id
function GetActividad(actividadid) {
  return mongoUtils.conn().then((client) => {
    try {
      return client
        .db(dataBase)
        .collection(COLLECTION_ACTIVIDAD)
        .findOne({ _id: ObjectId(actividadid) })
        .finally(() => client.close());
    } catch (error) {
      return error;
    }
  });
}
//Devuelve un actividad por Materia
function GetSubjetActivitis(Subjec) {
  return mongoUtils.conn().then((client) => {
    try {
      return client
        .db(dataBase)
        .collection(COLLECTION_ACTIVIDAD)
        .find({ subject: ObjectId(Subjec)})
        .toArray()
        .finally(() => client.close());
    } catch (error) {
      return error;
    }
  });
}
function getAllactividades(actividades) {
  return mongoUtils.conn().then((client) => {
    try {
      return client
        .db(dataBase)
        .collection(COLLECTION_ACTIVIDAD)
        .find({ _id: { $in: actividades } })
        .toArray()
        .finally(() => client.close());
    } catch (error) {
      return error;
    }
  });
}

// se agrega una actividad
function addAvtividad(body, materia) {
  return mongoUtils.conn().then((client) => {
    try {

      const actividad = {
        name: body.name,
        submissionDate: new Date(),
        period : body.period,
        description:body.description,
        percentage :body.percentage,
        subject : ObjectId (materia)
      };
      return client
        .db(dataBase)
        .collection(COLLECTION_ACTIVIDAD)
        .insertOne(actividad)
        .finally(() => client.close());
    } catch (error) {
      return error;
    }
  });
}
function AddActividaAMateria(materiaid, actividadid) {
  return mongoUtils.conn().then((client) => {
    try {
      return client
        .db(dataBase)
        .collection(COLLECTION_MATERIA)
        .updateOne(
          { _id: ObjectId(materiaid) },
          { $addToSet: { actividades: actividadid } },
        )
        .finally(() => client.close());
    } catch (error) {
      return error;
    }
  });
}
//Actualiza  una entrega
function UpDateActividad(body, actividadid) {
  return mongoUtils.conn().then((client) => {
    try {
      return client
        .db(dataBase)
        .collection(COLLECTION_ACTIVIDAD)
        .updateOne(
          { _id: ObjectId(actividadid) },
          { $set: { name: body.name, submissionDate: new Date(body.submissionDate),  description:body.description } },
        )
        .finally(() => client.close());
    } catch (error) {
      return error;
    }
  });
}
//elimina un actividad
function DeleteActividad(actividad) {
  return mongoUtils.conn().then((client) => {
    try {
      return client
        .db(dataBase)
        .collection(COLLECTION_ACTIVIDAD)
        .deleteOne({ _id: ObjectId(actividad) })
        .finally(() => client.close());
    } catch (error) {
      return error;
    }
  });
}
module.exports = [
  getMateria,
  getAllactividades,
  GetActividad,
  addAvtividad,
  UpDateActividad,
  DeleteActividad,
  AddActividaAMateria,
  GetAllActividades,
  GetSubjetActivitis
];
