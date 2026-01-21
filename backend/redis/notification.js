const redis = require("redis");

const client = redis.createClient();

client.on("connect", () => {
  console.log("Redis connected");
});

const sendNotification = async (message) => {
  await client.set("notification", message);
};

module.exports = sendNotification;
