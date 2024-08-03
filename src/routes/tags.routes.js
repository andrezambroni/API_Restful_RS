const { Router } = require("express");
const TagsController = require("../controllers/TagsController");

const tagsRoutes = Router();
const tagsController = new TagsController();

// Rota para listar todas as tags de um usuário
tagsRoutes.get("/:user_id", tagsController.index);

module.exports = tagsRoutes;
