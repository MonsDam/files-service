const File = require("../models/fileModel");
const path = require("path");
const fs = require("fs");
const fsPromises = require("fs").promises;

exports.uploadFile = async (req, res) => {
  console.log("file", req.file);
  if (!req.file) {
    return res.status(400).json({ message: "No se ha cargado ningún archivo" });
  }

  const { originalName, fileName, totalChunks, chunkIndex } = req.body;
  console.log("originalName", originalName);

  try {
    // Buscar o crear registro en la base de datos
    let fileRecord = await File.findOne({ fileName });
    console.log("fileRecord", fileRecord);
    if (!fileRecord) {
      fileRecord = new File({
        originalName,
        fileName,
        totalChunks,
        uploadedChunks: 0,
        fileSize: 0, // Se actualizará al final
        fileType: req.file.mimetype,
        filePath: '',
        isComplete: false,
      });
      await fileRecord.save();
    }

    // Guardar el chunk en la carpeta temporal
    const tempDir = path.join("uploads", "temp");
    console.log("tempDir", tempDir);

    // Verificar si la carpeta 'temp' existe, si no, crearla
    try {
      await fsPromises.access(tempDir); // Verifica si existe
    } catch (error) {
      await fsPromises.mkdir(tempDir, { recursive: true }); // Crea la carpeta si no existe
      console.log("Carpeta temporal creada.");
    }

    const chunkPath = path.join(tempDir, `${fileName}_chunk_${chunkIndex}`);
    console.log(" req.file.buffer", req.file.buffer);
    if (!req.file || !req.file.buffer) {
      return res.status(400).json({ message: 'El archivo está vacío o no se ha recibido correctamente.' });
    }
    await fsPromises.writeFile(chunkPath, req.file.buffer);

    // Actualizar progreso en la base de datos
    try {
      fileRecord.uploadedChunks += 1;
      await fileRecord.save();

    } catch (err) {
      console.log(err)
      return;
    }

    console.log(`Chunk ${chunkIndex} subido correctamente.`);

    // Ensamblar archivo si todos los chunks están completos
    console.log('mm', fileRecord.uploadedChunks === parseInt(totalChunks))
    if (fileRecord.uploadedChunks === parseInt(totalChunks)) {
      const finalFilePath = path.join("uploads", fileName);
      console.log(finalFilePath)

      const writeStream = fs.createWriteStream(finalFilePath);
      console.log(writeStream)

      console.log('ggggg')
      for (let i = 0; i < totalChunks; i++) {
        const currentChunkPath = path.join(tempDir, `${fileName}_chunk_${i}`);
        console.log(currentChunkPath)
        const chunk = fs.readFileSync(currentChunkPath);
        console.log(chunk);
        writeStream.write(chunk);
        await fsPromises.unlink(currentChunkPath); // Eliminar chunk después de ensamblarlo
      }

      console.log('pasandoooo')
      writeStream.end();

      // Actualizar estado en la base de datos
      fileRecord.isComplete = true;
      fileRecord.fileSize = fs.statSync(finalFilePath).size;
      fileRecord.filePath = finalFilePath;
      console.log('fileRecord.fileSize', fileRecord.fileSize)
      try {
        await fileRecord.save();

      } catch (err) {
        console.log(err);
        return;
      }

      return res
        .status(200)
        .json({
          message: "Archivo ensamblado con éxito.",
          filePath: finalFilePath,
        });
    }

    res
      .status(200)
      .json({ message: `Chunk ${chunkIndex} subido correctamente.` });
  } catch (error) {
    res.status(500).json({
      message: "Error al guardar el archivo en la base de datos",
      error,
    });
  }
};

exports.getFile = async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    console.log(file);
    if (!file) {
      return res.status(404).json({ message: "Archivo no encontrado" });
    }

    res.status(200).json(file);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el archivo", error });
  }
};

exports.downloadFile = async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    if (!file) {
      return res.status(404).json({ message: "Archivo no encontrado" });
    }

    // Enviar el archivo como descarga
    res.download(file.filePath, file.originalName, (err) => {
      if (err) {
        console.log("Error al enviar el archivo");
        if (!res.headersSent) {
          return res
            .status(500)
            .json({ message: "Error al mostrar el archivo", error: err });
        }
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el archivo", error });
  }
};

// Función para obtener todos los archivos
exports.getAllFiles = async (req, res) => {
  try {
    // Buscar todos los archivos en la base de datos
    const files = await File.find();

    // Si no hay archivos, devolver un mensaje
    if (files.length === 0) {
      return res.status(404).json({ message: "No se encontraron archivos" });
    }

    // Devolver los archivos en formato JSON
    res.status(200).json({ files });
  } catch (error) {
    // Manejo de errores si la operación de búsqueda falla
    res.status(500).json({ message: "Error al obtener los archivos", error });
  }
};

exports.deleteFile = async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    console.log("fileDelete", file);
    if (!file) {
      return res.status(404).json({ message: "Archivo no encontrado" });
    }
    console.log(file.filePath)
    const filePath = path.resolve(file.filePath);
    console.log(filePath)
    // Eliminar el archivo del sistema de archivos
    await fsPromises.unlink(filePath);


    // Eliminar el registro de la base de datos
    const deletedFile = await File.findByIdAndDelete(req.params.id);
    console.log(deletedFile)
    if (!deletedFile) {
      return res
        .status(500)
        .json({ message: "Error al eliminar el archivo de la base de datos" });
    }
    res.status(200).json({ message: "Archivo eliminado con éxito" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el archivo", error });
  }
};
