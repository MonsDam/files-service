const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  originalName: { type: String, required: true },
  fileName: { type: String, required: true },
  totalChunks: { type: Number, required: true },
  uploadedChunks: { type: Number, default: 0 },
  isComplete: { type: Boolean, default: false },
  fileSize: { type: Number, default: 0 },
  fileType: { type: String },
  uploadedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('File', fileSchema);
