/**
 * @module middleware/authenticateJWT
 * @description Middleware de autenticación para verificar el token JWT en las solicitudes.
 */

const jwt = require('jsonwebtoken');

/**
 * @function authenticateJWT
 * @description Middleware que valida la autenticación utilizando un token JWT. Verifica si el token es válido y, si lo es, extrae el ID del usuario del token y lo agrega al objeto de solicitud. Si no se proporciona un token o el token es inválido, responde con un error.
 * @param {Object} req - Objeto de solicitud, que contiene los datos de la solicitud HTTP.
 * @param {Object} res - Objeto de respuesta, que se utiliza para enviar la respuesta HTTP.
 * @param {Function} next - Función que se debe llamar para pasar al siguiente middleware o ruta.
 * @returns {void} Llama a `next()` si el token es válido, o responde con un error si el token no es proporcionado o es inválido.
 */
const authenticateJWT = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) {
        return res.status(403).json({ message: 'Acceso denegado: No se proporcionó un token' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Acceso denegado: Token inválido' });
        }

        // ID del usuario al objeto de la solicitud para ser usado
        req.userId = decoded.userId;

        next();  // Permitir que la solicitud pase al siguiente middleware o ruta
    });
};

module.exports = authenticateJWT;
