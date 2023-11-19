const jwt = require("jsonwebtoken");
const jwtKey = require('../configs/jwt.json').key;

const verifyToken = (req, res, next) => {
  // достаём токен
  const token = req.headers.authorization;

  // если токена нет
  if (!token) {
    return res.status(403).json({ error: 'A token is required for authentication'});
  }
  // проверка токена на валидность
  try {
    const decoded = jwt.verify(token, jwtKey);
    // передам в реквест юзера
    req.user = decoded;
  } catch (err) {
    return res.status(401).json({ error: 'Invalid Token'});
  }
  // след этап
  return next();
};

module.exports = verifyToken;