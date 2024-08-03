const { Router } = require("express");
const SessionsController = require("../controllers/SessionsController");

const sessionsRoutes = Router();
const sessionsController = new SessionsController();

// Rota para criar uma nova sessão (login)
sessionsRoutes.post("/", sessionsController.create);

module.exports = sessionsRoutes;
