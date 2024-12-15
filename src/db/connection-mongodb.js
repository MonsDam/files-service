//Conexion a la base de datos auth-server en mongoDB

const mongoose = require("mongoose");

const ConnectToMongoDB = async () => {
  const mongoURI =
    process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/files-db";
  try {
    await mongoose.connect(mongoURI);
    console.log("Conexion exitosa con MongoDB");
  } catch (error) {
    console.log("Error en la conexion con MongoDB: ", error.message);
    process.exit(1);
  }
};

module.exports = ConnectToMongoDB;
