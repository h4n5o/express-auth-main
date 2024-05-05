const jwt = require("jsonwebtoken");

const { JWT_SECRET } = process.env;

function createAccessToken(userId) {
  // Access Token mit dem Inhalt der User Id erstellen
  return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: '1h' });
}

function decodeAccessToken(accessToken) {
  // Den Inhalt des Access tokens dekodieren
  try {
    return jwt.verify(accessToken, JWT_SECRET);
  } catch (err) {
    console.log(err);
    return null;
  }
}

module.exports = { createAccessToken, decodeAccessToken };
