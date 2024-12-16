// Middleware de autenticación
const jwt = require('jsonwebtoken');

const authenticateJWT = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];
    console.log(token)

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
