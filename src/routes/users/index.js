const { Router } = require("express");
const { StatusCodes, ReasonPhrases } = require("http-status-codes");
const UserModel = require("../../database/models/UserModel");
const authMiddleWare = require('../../middlewares/authMiddleware'); // Importieren Sie die Authentifizierungsmiddleware

const UserRouter = Router();

// GET REQUESTS
UserRouter.get("/currentuser", authMiddleWare, async (req, res) => {
  // TODO: der Nutzer soll basierend auf der userId aus dem Token ermittelt werden
  const userId = req.user.id; // Die Benutzer-ID aus dem Token erhalten
  const user = await UserModel.findById(userId); // Den Benutzer aus der Datenbank abrufen
  if (!user) {
    return res.status(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND);
  }
  res.send(user);
});

module.exports = { UserRouter };
