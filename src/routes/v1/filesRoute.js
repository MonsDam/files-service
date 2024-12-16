// files routes

const express = require('express');
const upload = require('../../middlewares/uploadMiddleware');
const { uploadFile, getFile, getAllFiles, deleteFile } = require('../../controllers/fileController');

const router = express.Router();

router.post('/upload', upload, uploadFile);
router.get('/view/:id', getFile);
router.get('/files', getAllFiles);
router.delete('/delete/:id', deleteFile);

module.exports = router;
