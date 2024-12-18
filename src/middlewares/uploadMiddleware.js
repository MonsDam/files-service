/**
 * @module middleware/upload
 * @description Middleware para manejar la carga de archivos utilizando Multer.
 */

const multer = require('multer');
const fs = require('fs').promises;  
const path = require('path');

/**
 * @function ensureDirExists
 * @description Verifica si un directorio existe. Si no existe, lo crea de manera recursiva.
 * @param {string} dir - La ruta del directorio a verificar.
 * @returns {Promise<void>} Promesa que indica si el directorio existe o ha sido creado.
 */
const ensureDirExists = async (dir) => {
  try {
    await fs.access(dir); // Verifica si la carpeta existe
  } catch {
    await fs.mkdir(dir, { recursive: true }); // Crea la carpeta si no existe
  }
};

// Configuración de Multer para el almacenamiento de archivos en memoria
/**
 * @constant storage
 * @description Configuración de almacenamiento de Multer para guardar archivos en la memoria del servidor.
 */
const storage = multer.memoryStorage();

/**
 * @constant upload
 * @description Configuración de Multer que gestiona la carga de archivos con un límite de tamaño de 5GB.
 * Utiliza el almacenamiento en memoria y permite cargar un solo archivo a la vez bajo el campo 'chunk'.
 */
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 * 1024 } // 5GB en bytes
}).single('chunk');

module.exports = upload;
