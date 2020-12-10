const MongoClient = require("mongodb").MongoClient;
const uri =
  "mongodb+srv://monitoring_user:1lu2FVkwySSIlAjt@web.sycyu.mongodb.net/omicronEntrega4?retryWrites=true&w=majority";
const dataBase = "omicronEntrega4";

function MongoUtils() {
  const mu = {};

  // Esta función retorna una nueva conexión a MongoDB.
  // Tenga presente que es una promesa que deberá ser resuelta.
  mu.conn = () => {
    const client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    return client.connect();
  };
  return mu;
}

process.on("SIGINT", async function () {
  console.log("connection ended");
  const client = await MongoUtils().conn();
  client.close().then((data) => console.log("conn ended"));
});

exports.mongoUtils = MongoUtils();
exports.dataBase = dataBase;
