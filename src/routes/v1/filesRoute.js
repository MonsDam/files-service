// files routes

const express = require('express');
const authenticateJWT = require('../../middlewares/authJWT');
const upload = require('../../middlewares/uploadMiddleware');
const { uploadFile, getFile, downloadFile, getAllFiles, deleteFile } = require('../../controllers/fileController');

const router = express.Router();

router.post('/upload', authenticateJWT, upload, uploadFile);
router.get('/view/:id', authenticateJWT, getFile);
router.get('/download/:id', authenticateJWT, downloadFile);
router.get('/files', authenticateJWT, getAllFiles);
router.delete('/delete/:id', authenticateJWT, deleteFile);

module.exports = router;
