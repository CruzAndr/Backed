const jwt = require('jsonwebtoken');
require('dotenv').config(); 

// Generar un token
function generateToken(user) {
  return jwt.sign({ id: user.id}, process.env.SECRET_KEY, { expiresIn: '1h' });
}
 

// Verificar el token
function verifyToken(req, res, next) {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).json({ message: 'Token no proporcionado' });

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) return res.status(401).json({ message: 'Token inválido' });
    req.user = decoded;S
    next();
  });
}

module.exports = { generateToken, verifyToken };
