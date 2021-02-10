const { MongoClient, ObjectId } = require("mongodb");
const fs = require("fs");
const connectionOptions = {
    keepAlive: true,
    appname: "express",
    useUnifiedTopology: true
  }

let client = null;

const makeMongoConnection = async () => {
  if (!client) {
    const credentials = fs.readFileSync(
      //"./certs/X509-cert-6747114790957957502.pem"
      './certs/WBoom-Atlas-Staging.pem'
    );

    client = new MongoClient(
      //"mongodb+srv://skylarkdev.lgcsc.mongodb.net/strapi-atlas?authSource=%24external&authMechanism=MONGODB-X509&retryWrites=true&w=majority",
      'mongodb+srv://cluster0.ixdkd.mongodb.net/te_tier1?authSource=%24external&authMechanism=MONGODB-X509&retryWrites=true&w=majority', 
      {
        sslKey: credentials,
        sslCert: credentials,
        ...connectionOptions
      }
    );
    await client.connect();
  }
  return client;
};

module.exports = {
  makeMongoConnection: makeMongoConnection,
};
