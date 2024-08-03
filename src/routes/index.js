const { Router } = require("express");
const usersRoutes = require("./users.routes");
const notesRoutes = require("./notes.routes");
const tagsRoutes = require("./tags.routes");
const sessionsRoutes = require("./sessions.routes");

const routes = Router();

// Define a rota base para usuários
routes.use("/users", usersRoutes);
// Define a rota base para notas
routes.use("/notes", notesRoutes);
// Define a rota base para tags
routes.use("/tags", tagsRoutes);
// Define a rota base para sessões (login)
routes.use("/sessions", sessionsRoutes);

module.exports = routes;
