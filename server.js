const app = require('./src/app');
const config = require('./src/config/config');

// Iniciar el servidor
app.listen(config.port, () => {
    console.log(`Servidor corriendo en http://localhost:${config.port}`);
});
