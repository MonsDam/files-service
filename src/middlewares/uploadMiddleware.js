const multer = require('multer');
const fs = require('fs');
const path = require('path');

// Configuración de Multer para el almacenamiento de archivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log('first')
    // Valida que la carpeta de destino exista
    const dir = 'uploads';
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    cb(null, dir); // Carpeta 'uploads' donde se guardarán los archivos
  },
  filename: (req, file, cb) => {
    console.log(req)
    const { fileName, chunkIndex } = req.body;
    cb(null, `${fileName}_chunk_${chunkIndex}${path.extname(file.originalname)}`); // Nombre único para cada archivo
  }
});

// Configuración de los límites de carga, en este caso, 3GB máximo
const upload = multer({
  storage: storage,
  limits: { fileSize: 3 * 1024 * 1024 * 1024 } // 3GB en bytes
}).none();

module.exports = upload;
