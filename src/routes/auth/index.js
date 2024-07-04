const { Router } = require("express");
const { StatusCodes, ReasonPhrases } = require("http-status-codes");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User } = require('./models'); // Stellen Sie sicher, dass Sie ein User-Modell haben

const AuthRouter = Router();

// POST REQUESTS

AuthRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Überprüfen Sie die Anmeldeinformationen mit Ihrer Datenbank
  const user = await User.findOne({ where: { email } });

  if (!user || !await bcrypt.compare(password, user.password)) {
    res.status(StatusCodes.UNAUTHORIZED).send(ReasonPhrases.UNAUTHORIZED);
    return;
  }

  // Erstellen Sie ein Token
  const token = jwt.sign({ id: user.id }, 'your-secret-key');

  res.send({ token });
});

AuthRouter.post("/signup", async (req, res) => {
  const { email, password, name, profileImgUrl } = req.body;

  if (!email || !password || !name || !profileImgUrl) {
    res.status(StatusCodes.BAD_REQUEST).send(ReasonPhrases.BAD_REQUEST);
    return;
  }

  // Erstellen Sie einen neuen Benutzer in Ihrer Datenbank
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ email, password: hashedPassword, name, profileImgUrl });

  // Erstellen Sie ein Token
  const token = jwt.sign({ id: user.id }, 'your-secret-key');

  res.send({ token });
});

module.exports = { AuthRouter };
