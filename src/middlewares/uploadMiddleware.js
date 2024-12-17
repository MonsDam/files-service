const multer = require('multer');
const fs = require('fs').promises;  
const path = require('path');

const ensureDirExists = async (dir) => {
  try {
    await fs.access(dir); // Verifica si la carpeta existe
  } catch {
    await fs.mkdir(dir, { recursive: true }); // Crea la carpeta si no existe
  }
};

// Configuración de Multer para el almacenamiento de archivos
const storage = multer.memoryStorage();

// Configuración de los límites de carga, en este caso, 3GB máximo
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 * 1024 } // 5GB en bytes
}).single('chunk');

module.exports = upload;
