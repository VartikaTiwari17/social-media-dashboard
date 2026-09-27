const { Redis } = require("@upstash/redis");

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

const sendNotification = async (message) => {
  try {
    await redis.set("notification", message);
  } catch (err) {
    console.error("Notification failed:", err.message);
  }
};

module.exports = sendNotification;