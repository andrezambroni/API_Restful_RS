const knex = require("../database/knex");

class TagsController {
  // Método para listar todas as tags de um usuário
  async index(request, response) {
    const { user_id } = request.params;

    // Obtém todas as tags do usuário
    const tags = await knex("tags").where({ user_id });

    return response.json(tags);
  }
}

module.exports = TagsController;
