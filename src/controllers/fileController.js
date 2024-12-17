const combineChunks = require("../helpers/combineChunks");
const File = require("../models/fileModel");
const path = require('path');
const fs = require('fs').promises;

exports.uploadFile = async (req, res) => {
  console.log(req.file)
  if (!req.file) {
    return res.status(400).json({ message: "No se ha cargado ningún archivo" });
  }

  const { originalName, fileName, totalChunks, chunkIndex } = req.body;

  try {
    let fileRecord = await File.findOne({ fileName });

    if (!fileRecord) {

      fileRecord = new File({
        originalName,
        fileName,
        totalChunks,
        uploadedChunks: 0,
        fileSize: 0,
        fileType: req.file.mimetype,
        isComplete: false,
      });

      await fileRecord.save();
    }

    // Guardamos el chunk en la carpeta de uploads
    const chunkPath = path.join(__dirname, 'uploads', `${fileName}_chunk_${chunkIndex}`);
    await fs.promises.writeFile(chunkPath, req.file.buffer);

    // Actualizamos el número de chunks subidos en la base de datos
    fileRecord.uploadedChunks += 1;

    if (fileRecord.uploadedChunks === totalChunks) {
      fileRecord.isComplete = true;

      // Combinamos los chunks en un archivo final
      const finalFilePath = path.join(__dirname, 'uploads', fileName);
      await combineChunks(fileName, totalChunks, finalFilePath);

      fileRecord.filePath = finalFilePath;
      fileRecord.fileSize = fs.statSync(finalFilePath).size;
    }

    await fileRecord.save();

    res.status(200).json({ message: "Chunk subido exitosamente", uploadedChunks: fileRecord.uploadedChunks });


  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error al guardar el archivo en la base de datos",
        error,
      });
  }
};

exports.getFile = async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    console.log(file)
    if (!file) {
      return res.status(404).json({ message: 'Archivo no encontrado' });
    }

    res.status(200).json(file);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el archivo', error });
  }
}

exports.downloadFile = async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    if (!file) {
      return res.status(404).json({ message: 'Archivo no encontrado' });
    }

    // Enviar el archivo como descarga
    res.download(file.filePath, file.originalName, (err) => {
      if (err) {
        console.log('Error al enviar el archivo')
        if (!res.headersSent) {
          return res.status(500).json({ message: 'Error al mostrar el archivo', error: err });
        }
      }
    })
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el archivo', error });
  }
}

// Función para obtener todos los archivos
exports.getAllFiles = async (req, res) => {
  try {
    // Buscar todos los archivos en la base de datos
    const files = await File.find();

    // Si no hay archivos, devolver un mensaje
    if (files.length === 0) {
      return res.status(404).json({ message: 'No se encontraron archivos' });
    }

    // Devolver los archivos en formato JSON
    res.status(200).json({ files });
  } catch (error) {
    // Manejo de errores si la operación de búsqueda falla
    res.status(500).json({ message: 'Error al obtener los archivos', error });
  }
};


exports.deleteFile = async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    console.log('fileDelete', file)
    if (!file) {
      return res.status(404).json({ message: 'Archivo no encontrado' });
    }
    const filePath = path.resolve(file.filePath);

    // Eliminar el archivo del sistema de archivos
    await fs.unlink(filePath);

    // Eliminar el registro de la base de datos
    const deletedFile = await File.findByIdAndDelete(req.params.id);
    if (!deletedFile) {
      return res.status(500).json({ message: 'Error al eliminar el archivo de la base de datos' });
    }
    res.status(200).json({ message: 'Archivo eliminado con éxito' });

  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el archivo', error });
  }
}