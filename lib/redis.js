const redisVars = {
  dbName: "TrueEvents-Development",
  host: "redis-14965.c243.eu-west-1-3.ec2.cloud.redislabs.com",
  port: 14965,
  protocol: "redis://",
  email: "wendell@trueevents.live",
  password: "zDGqVGg3ZzDHXCBD5kSXIQDeLAi0xjsB",
};

const getRedisUri = () => {
  let rtn = redisVars.protocol;
  rtn += redisVars.email + ":";
  rtn += redisVars.password + "@";
  rtn += redisVars.host + ":";
  rtn += redisVars.port;
  return rtn;
};

let redis = require("redis");
let client = redis.createClient(getRedisUri());
client.on("ready",()=>{
    console.log("Redis reported it is ready")
})
client.on("error",(err)=>{
    console.log("Redis reported an error %s", err.message)
})
client.on("end",(err)=>{
    console.log("Redis reported the connection was closed")
})
module.exports = client;
