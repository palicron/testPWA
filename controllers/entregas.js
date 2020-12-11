const { mongoUtils, dataBase } = require("../lib/utils/mongo");
const { ObjectId } = require("mongodb");
const { json } = require("express");
const COLLECTION_ENTREGA = "submissions";
const COLLECTION_ACTIVIDAD = "actividades";
const COLLECTION_ESTUDIANTE = "estudiante";

//Devuelve todas las entregas de una actividad
function GetAllEntregas(entregas) {
  return mongoUtils.conn().then((client) => {
    return client
      .db(dataBase)
      .collection(COLLECTION_ENTREGA)
      .find({ activity: ObjectId(entregas) })
      .toArray();
  });
}
// Devuelve todas las entrega de la DB
function GetAllSubmitions() {
  return mongoUtils.conn().then((client) => {
    return client
      .db(dataBase)
      .collection(COLLECTION_ENTREGA)
      .find({})
      .toArray();
  });
}
//Devuelve un entrega por id
function GetSubmition(entregaId) {
  return mongoUtils.conn().then((client) => {
    try {
      return client
        .db(dataBase)
        .collection(COLLECTION_ENTREGA)
        .findOne({ _id: ObjectId(entregaId) })
        .finally(() => client.close());
    } catch (error) {
      return error;
    }
  });
}
//Devuelve todas las entregas de un estudiantes
function GetAllEntregaEstudiante(estudiante) {
  return mongoUtils.conn().then((client) => {
    return client
      .db(dataBase)
      .collection(COLLECTION_ENTREGA)
      .find({ student: ObjectId(estudiante) })
      .toArray();
  });
}
//crea un nueva entrega
function addEntrega(body, actividadId, estudianteId) {
  return mongoUtils.conn().then((client) => {
    try {
      const entrega = {
        activity: ObjectId(actividadId),
        grade: null,
        submissionDate: new Date(),
        student: ObjectId(estudianteId),
        submission: body.submission,
      };
      return client
        .db(dataBase)
        .collection(COLLECTION_ENTREGA)
        .insertOne(entrega)
        .finally(() => client.close());
    } catch (error) {
      return error;
    }
  });
}
function addEntregaActividad(actividad, entregaid, body) {
  return mongoUtils.conn().then((client) => {
    try {
      client
        .db(dataBase)
        .collection(COLLECTION_ESTUDIANTE)
        .updateOne(
          { nombre: body.nombre },
          { $addToSet: { entregas: entregaid } },
        );
      return client
        .db(dataBase)
        .collection(COLLECTION_ACTIVIDAD)
        .updateOne(
          { _id: ObjectId(actividad) },
          { $addToSet: { entregas: entregaid } },
        )
        .finally(() => client.close());
    } catch (error) {
      return error;
    }
  });
}
function addImagen(entregaid, body) {
  return mongoUtils.conn().then((client) => {
    try {
      return client
        .db(dataBase)
        .collection(COLLECTION_ENTREGA)
        .updateOne(
          { _id: ObjectId(entregaid) },
          { $push: { Imagenes: { $each: body.entrega } } },
        )
        .finally(() => client.close());
    } catch (error) {
      return error;
    }
  });
}
function DeleteEntrega(entregaId) {
  return mongoUtils.conn().then((client) => {
    try {
      const numver = actividad;
      return client
        .db(dataBase)
        .collection(COLLECTION_ENTREGA)
        .deleteOne({ _id: ObjectId(entregaId) })
        .finally(() => client.close());
    } catch (error) {
      return error;
    }
    //  return client.db("omicron").collection('actividades').deleteOne({_id:actividad._id});
  });
}

//actuliza la nota de una entrega
function UpdateEntrega(body, entregaId) {
  return mongoUtils.conn().then((client) => {
    try {
      return client
        .db(dataBase)
        .collection(COLLECTION_ENTREGA)
        .updateOne(
          { _id: ObjectId(entregaId) },
          {
            $set: {
              grade: body.grade, 
              comment:body.comment
            },
          },
        )
        .finally(() => client.close());
    } catch (error) {
      return error;
    }
  });
}
module.exports = [
  GetAllEntregas,
  addEntrega,
  addEntregaActividad,
  DeleteEntrega,
  UpdateEntrega,
  addImagen,
  GetAllSubmitions,
  GetAllEntregaEstudiante,
  GetSubmition,
];
