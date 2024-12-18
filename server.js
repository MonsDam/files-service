/**
 * @module server
 * @description Inicia el servidor Express y establece la conexión con la base de datos utilizando la configuración definida en `config`.
 */

const app = require('./src/app');
const config = require('./src/config/config');

// Iniciar el servidor
/**
 * @description Inicia el servidor Express en el puerto definido en la configuración.
 * @example
 * // El servidor se inicia en el puerto configurado en config.port
 * app.listen(config.port, () => {
 *     console.log(`Servidor corriendo en http://localhost:${config.port}`);
 * });
 */
app.listen(config.port, () => {
    console.log(`Servidor corriendo en http://localhost:${config.port}`);
});
