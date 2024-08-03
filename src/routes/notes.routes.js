const { Router } = require("express");
const NotesController = require("../controllers/NotesController");

const notesRoutes = Router();
const notesController = new NotesController();

// Rota para listar notas
notesRoutes.get("/", notesController.index);
// Rota para criar uma nova nota
notesRoutes.post("/", notesController.create);
// Rota para exibir uma nota específica
notesRoutes.get("/:id", notesController.show);
// Rota para deletar uma nota
notesRoutes.delete("/:id", notesController.delete);

module.exports = notesRoutes;
