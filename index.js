const mongodb = require("./lib/mongo");
let connection;

(async () => {
  console.log("Begin connection to mongodb on atlas using x509 certificate");
  try {
    connection = await mongodb.makeMongoConnection();
  } catch (err) {
    console.error("There was an error connecting to mongoDB");
    console.error(err.message);
  }
  console.log(`mongo connection isConnected is ${connection.isConnected}`);
  await connection.close(true)
})();
