const File = require("../models/fileModel");
const path = require('path');
const fs = require('fs').promises;

exports.uploadFile = async (req, res) => {
  // Verificamos si el archivo fue cargado correctamente
  if (!req.file) {
    return res.status(400).json({ message: "No se ha cargado ningún archivo" });
  }

  // Crear un registro en la base de datos con los metadatos del archivo
  try {
    const newFile = new File({
      originalName: req.file.originalname,
      fileName: req.file.filename,
      filePath: req.file.path,
      fileSize: req.file.size,
      fileType: req.file.mimetype,
    });
    console.log('de', newFile)

    await newFile.save();
    res
      .status(200)
      .json({ message: "Archivo subido con éxito", file: newFile });
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