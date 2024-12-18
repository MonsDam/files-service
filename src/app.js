/**
 * @module app
 * @description Configura y ejecuta el servidor Express para la gestión de archivos, incluyendo la configuración de middleware y rutas.
 */

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectToMongoDB = require('./db/connection-mongodb');
const filesRoutes = require('./routes/v1/filesRoute');

// Cargar variables de entorno desde el archivo .env
dotenv.config();

const app = express();

// Middleware
/**
 * @description Middleware para habilitar CORS (Cross-Origin Resource Sharing), permitiendo solicitudes de otros dominios.
 */
app.use(cors());

/**
 * @description Middleware para analizar el cuerpo de las solicitudes en formato JSON.
 */
app.use(express.json());

/**
 * @description Conectar a la base de datos MongoDB utilizando la configuración definida en la función `connectToMongoDB`.
 */
connectToMongoDB();

/**
 * @route GET /
 * @description Ruta principal que responde con un mensaje de bienvenida.
 * @returns {object} Mensaje de bienvenida.
 */
app.get('/', (req, res) => {
    res.send('¡Hola, Bienvenido al sistema de gestion de archivos!');
});

/**
 * @description Configura las rutas para manejar las operaciones de archivos, como cargar, descargar y eliminar archivos.
 * @route /api/v1/
 * @module routes/v1/filesRoute
 */
app.use('/api/v1/', filesRoutes);

module.exports = app;
