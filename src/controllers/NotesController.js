const knex = require("../database/knex");

class NotesController {
  // Método para listar notas com base em filtros de título e tags
  async index(request, response) {
    const { title, user_id, tags } = request.query;

    let notes;

    if (tags) {
      // Se houver tags, filtra as notas que possuem essas tags
      const filterTags = tags.split(",").map((tag) => tag.trim());

      notes = await knex("tags")
        .select(["notes.id", "notes.title", "notes.user_id"])
        .where("notes.user_id", user_id)
        .whereLike("notes.title", `%${title}%`)
        .whereIn("name", filterTags)
        .innerJoin("notes", "notes.id", "tags.note_id")
        .orderBy("notes.title");
    } else {
      // Se não houver tags, filtra apenas pelo título e usuário
      notes = await knex("notes")
        .where({ user_id })
        .whereLike("title", `%${title}%`)
        .orderBy("title");
    }

    // Obtém todas as tags do usuário
    const userTags = await knex("tags").where({ user_id });
    // Mapeia as notas para incluir suas tags
    const notesWhithTags = notes.map((note) => {
      const noteTags = userTags.filter((tag) => tag.note_id === note.id);

      return {
        ...note,
        tags: noteTags,
      };
    });

    // Retorna as notas com suas tags
    return response.json(notesWhithTags);
  }

  // Método para criar uma nova nota
  async create(request, response) {
    const { title, description, user_id, tags, links } = request.body;

    // Insere a nova nota no banco de dados
    const [note_id] = await knex("notes").insert({
      title,
      description,
      user_id,
    });

    // Insere as tags associadas à nota
    const tagsInsert = tags.map((name) => {
      return {
        note_id,
        name,
        user_id,
      };
    });

    await knex("tags").insert(tagsInsert);

    // Insere os links associados à nota
    const linksInsert = links.map((link) => {
      return {
        note_id,
        url: link,
      };
    });

    await knex("links").insert(linksInsert);

    return response.json();
  }

  // Método para exibir uma nota específica
  async show(request, response) {
    const { id } = request.params;

    // Obtém a nota pelo ID
    const note = await knex("notes").where({ id }).first();
    // Obtém as tags associadas à nota
    const tags = await knex("tags").where({ note_id: id }).orderBy("name");
    // Obtém os links associados à nota
    const links = await knex("links")
      .where({ note_id: id })
      .orderBy("created_at");

    // Retorna a nota com suas tags e links
    return response.json({
      ...note,
      tags,
      links,
    });
  }

  // Método para deletar uma nota
  async delete(request, response) {
    const { id } = request.params;

    // Deleta a nota pelo ID
    await knex("notes").where({ id }).delete();

    return response.json();
  }
}

module.exports = NotesController;
