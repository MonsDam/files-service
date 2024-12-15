module.exports = {
  // Puerto donde se ejecutará el servidor
  port: process.env.PORT || 8001,
  mongodb_uri: process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/files-db",
};
