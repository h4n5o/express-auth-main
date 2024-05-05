const { decodeAccessToken } = require("../services/auth/AccessToken"); // Importieren Sie die Funktion zum Dekodieren eines Tokens

function authMiddleWare(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(403).json({ error: 'No token provided.' });
  }
  const token = authHeader.split(' ')[1]; // Der Token sollte im Format "Bearer <token>" kommen
  try {
    const decoded = decodeAccessToken(token);
    req.user = decoded; // Fügen Sie die dekodierten Informationen zur Anforderung hinzu
    next();
  } catch (err) {
    return res.status(500).json({ error: 'Failed to authenticate token.' });
  }
}

module.exports = authMiddleWare;
