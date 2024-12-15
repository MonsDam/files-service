require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectToMongoDB = require('./src/db/connection-mongodb')

const config = require('./src/config/config');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Conectar a MongoDB
connectToMongoDB();

// Ruta principal
app.get('/', (req, res) => {
    res.send('¡Hola, Express!');
});

// Iniciar el servidor
app.listen(config.port, () => {
    console.log(`Servidor corriendo en http://localhost:${config.port}`);
});
