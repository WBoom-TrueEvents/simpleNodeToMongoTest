const mongodb = require("./lib/mongo");
const { promisify } = require("util");
let connection;
let collection;
let count;
const redisconnection = require("./lib/redis");
const getAsync = promisify(redisconnection.get).bind(redisconnection);
const setAsync = promisify(redisconnection.set).bind(redisconnection);

(async () => {
  console.log("Begin connection to mongodb on atlas using x509 certificate");
  try {
    connection = await mongodb.makeMongoConnection();
    collection = connection.db("apollographdb").collection("dummydata");
    count = await collection.countDocuments({});
    console.log(
      "Connection to mongo established with test data having %d documents",
      count
    );
  } catch (err) {
    console.error("There was an error connecting to mongoDB");
    console.error(err.message);
  }
  console.log(`mongo connection isConnected is ${connection.isConnected()}`);
  console.time("noncache");
  console.log("Performing test requests (no cache)");
  for (let index = 0; index < 100; index++) {
    let recordNumber = Math.floor(Math.random() * Math.floor(count));
    let record = await collection.findOne({}, { skip: recordNumber });
  }
  console.timeEnd("noncache");

  console.time("cache");
  console.log("Performing test requests (with cache)");
  for (let index = 0; index < 100; index++) {
    let recordNumber = Math.floor(Math.random() * Math.floor(count));
    let record = await getAsync(recordNumber + "");
    if (!record) {
      record = await collection.findOne({}, { skip: recordNumber });
      await setAsync(recordNumber + "", JSON.stringify(record));
    } else {
      record = JSON.parse(record)
    }
  }
  console.timeEnd("cache");
  collection=null
  await connection.close(true);
  console.log("Disconnected from mongo");
})();
