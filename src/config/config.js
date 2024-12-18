/**
 * @module config
 * @description Configuración del servidor y la base de datos.
 */

module.exports = {
  /**
   * @property {number|string} port
   * @description Puerto donde se ejecutará el servidor.
   * Si no se encuentra definido en la variable de entorno `PORT`, se utiliza el puerto por defecto `8001`.
   * @example
   * // Para definir el puerto en el entorno:
   * process.env.PORT = 3000;
   */
  port: process.env.PORT || 8001,

  /**
   * @property {string} mongodb_uri
   * @description URI de conexión a la base de datos MongoDB.
   * Si no se encuentra definida en la variable de entorno `MONGODB_URI`, se utiliza la URI por defecto `mongodb://127.0.0.1:27017/files-db`.
   * @example
   * // Para definir la URI en el entorno:
   * process.env.MONGODB_URI = "mongodb+srv://user:password@cluster.mongodb.net/mydatabase";
   */
  mongodb_uri: process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/files-db",
};
