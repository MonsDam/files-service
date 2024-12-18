/**
 * @module models/fileModel
 * @description Definición del esquema y modelo para los archivos en la base de datos MongoDB.
 */

const mongoose = require('mongoose');

/**
 * @typedef {Object} File
 * @property {string} originalName - El nombre original del archivo subido.
 * @property {string} fileName - El nombre del archivo en el sistema de almacenamiento.
 * @property {number} totalChunks - El número total de fragmentos del archivo.
 * @property {number} uploadedChunks - El número de fragmentos que se han subido.
 * @property {boolean} isComplete - Estado que indica si el archivo ha sido completamente subido.
 * @property {number} fileSize - El tamaño total del archivo en bytes.
 * @property {string} fileType - El tipo MIME del archivo (por ejemplo, 'image/jpeg').
 * @property {string} filePath - La ruta donde se almacena el archivo en el sistema.
 * @property {Date} uploadedAt - La fecha y hora en la que se subió el archivo.
 */

/**
 * @constant fileSchema
 * @description Esquema de Mongoose que define la estructura de los documentos de archivo en la base de datos.
 */
const fileSchema = new mongoose.Schema({
  originalName: { type: String, required: true },
  fileName: { type: String, required: true },
  totalChunks: { type: Number, required: true },
  uploadedChunks: { type: Number, default: 0 },
  isComplete: { type: Boolean, default: false },
  fileSize: { type: Number, default: 0 },
  fileType: { type: String },
  filePath: { type: String },
  uploadedAt: { type: Date, default: Date.now },
});

/**
 * @function
 * @description Crea y exporta el modelo 'File' basado en el esquema `fileSchema`.
 * @returns {mongoose.Model<File>} El modelo de Mongoose para interactuar con la colección de archivos en la base de datos.
 */
module.exports = mongoose.model('File', fileSchema);
