/**
 * @module db/connection-mongodb
 * @description Módulo para la conexión a la base de datos MongoDB.
 */

const mongoose = require("mongoose");

/**
 * @function ConnectToMongoDB
 * @description Establece la conexión con la base de datos MongoDB. Si la conexión es exitosa, muestra un mensaje en la consola. Si ocurre un error, lo muestra y termina el proceso.
 * @async
 * @returns {Promise<void>} Promesa que representa el estado de la conexión.
 */
const ConnectToMongoDB = async () => {
  const mongoURI =
    process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/files-db";
  try {
    await mongoose.connect(mongoURI);
    console.log("Conexion exitosa con MongoDB");
  } catch (error) {
    console.log("Error en la conexion con MongoDB: ", error.message);
    process.exit(1); // Finaliza el proceso en caso de error en la conexión
  }
};

module.exports = ConnectToMongoDB;
