const multer = require('multer');
const fs = require('fs');
const path = require('path');

// Configuración de Multer para el almacenamiento de archivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Asegúrate de que la carpeta de destino exista
    const dir = 'uploads';
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    cb(null, dir); // Carpeta 'uploads' donde se guardarán los archivos
  },
  filename: (req, file, cb) => {
    // Nombrar el archivo con un timestamp para evitar conflictos
    cb(null, Date.now() + path.extname(file.originalname)); // Nombre único para cada archivo
  }
});

// Configuración de los límites de carga, en este caso, 1GB máximo
const upload = multer({
  storage: storage,
  limits: { fileSize: 3 * 1024 * 1024 * 1024} // 3GB en bytes
}).single('file'); // Esperamos un solo archivo con el campo 'file'

module.exports = upload;
