const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectToMongoDB = require('./db/connection-mongodb');
const filesRoutes =  require('./routes/v1/filesRoute');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Conectar a MongoDB
connectToMongoDB();

// Ruta principal
app.get('/', (req, res) => {
    res.send('¡Hola, Bienvenido al sistema de gestion de archivos!');
});
app.use('/api/v1/', filesRoutes);


module.exports = app;
