/**
 * @module routes/filesRoutes
 * @description Define las rutas para manejar la carga, descarga y gestión de archivos en la aplicación.
 */

const express = require('express');
const authenticateJWT = require('../../middlewares/authJWT');
const upload = require('../../middlewares/uploadMiddleware');
const { uploadFile, getFile, downloadFile, getAllFiles, deleteFile } = require('../../controllers/fileController');

const router = express.Router();

/**
 * @route POST /upload
 * @description Ruta para cargar un archivo al servidor. Requiere autenticación.
 * @middleware authenticateJWT - Middleware para autenticar al usuario mediante JWT.
 * @middleware upload - Middleware para manejar la carga del archivo.
 * @param {string} req.body.originalName - El nombre original del archivo.
 * @param {string} req.body.fileName - El nombre del archivo en el sistema.
 * @param {number} req.body.totalChunks - El número total de fragmentos del archivo.
 * @param {number} req.body.chunkIndex - El índice del fragmento cargado.
 * @returns {object} Respuesta con el estado de la carga del archivo.
 */
router.post('/upload', authenticateJWT, upload, uploadFile);

/**
 * @route GET /view/:id
 * @description Ruta para obtener los detalles de un archivo por su ID. Requiere autenticación.
 * @middleware authenticateJWT - Middleware para autenticar al usuario mediante JWT.
 * @param {string} req.params.id - El ID del archivo a visualizar.
 * @returns {object} Detalles del archivo.
 */
router.get('/view/:id', authenticateJWT, getFile);

/**
 * @route GET /download/:id
 * @description Ruta para descargar un archivo por su ID. Requiere autenticación.
 * @middleware authenticateJWT - Middleware para autenticar al usuario mediante JWT.
 * @param {string} req.params.id - El ID del archivo a descargar.
 * @returns {file} El archivo descargado.
 */
router.get('/download/:id', authenticateJWT, downloadFile);

/**
 * @route GET /files
 * @description Ruta para obtener todos los archivos. Requiere autenticación.
 * @middleware authenticateJWT - Middleware para autenticar al usuario mediante JWT.
 * @returns {Array} Lista de archivos almacenados.
 */
router.get('/files', authenticateJWT, getAllFiles);

/**
 * @route DELETE /delete/:id
 * @description Ruta para eliminar un archivo por su ID. Requiere autenticación.
 * @middleware authenticateJWT - Middleware para autenticar al usuario mediante JWT.
 * @param {string} req.params.id - El ID del archivo a eliminar.
 * @returns {object} Respuesta con el estado de la eliminación del archivo.
 */
router.delete('/delete/:id', authenticateJWT, deleteFile);

module.exports = router;
