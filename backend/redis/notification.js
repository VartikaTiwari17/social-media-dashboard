const redis = require("redis");

const client = redis.createClient();

client.on("error", (err) => console.error("Redis error:", err));
client.on("connect", () => console.log("Redis connected"));

client.connect(); // redis v4+ mein connect karna zaroori hai

const sendNotification = async (message) => {
  try {
    await client.set("notification", message);
  } catch (err) {
    console.error("Notification failed:", err.message);
  }
};

module.exports = sendNotification;