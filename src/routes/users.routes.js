const { Router } = require("express");
const UsersController = require("../controllers/UsersController");

const usersRoutes = Router();
const usersController = new UsersController();

// Rota para criar um novo usuário
usersRoutes.post("/", usersController.create);
// Rota para atualizar um usuário existente
usersRoutes.put("/:id", usersController.update);

module.exports = usersRoutes;
