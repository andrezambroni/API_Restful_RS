exports.up = function (knex) {
  // Cria a tabela 'tags'
  return knex.schema.createTable("tags", (table) => {
    table.increments("id").primary(); // Coluna 'id' auto-incrementada e chave primária
    table.text("name").notNullable(); // Coluna 'name' do tipo texto e não nula
    table
      .integer("note_id")
      .references("id")
      .inTable("notes")
      .onDelete("CASCADE"); // Coluna 'note_id' referenciando 'id' da tabela 'notes' com delete em cascata
    table
      .integer("user_id")
      .references("id")
      .inTable("users")
      .onDelete("CASCADE"); // Coluna 'user_id' referenciando 'id' da tabela 'users' com delete em cascata
  });
};

exports.down = function (knex) {
  // Deleta a tabela 'tags'
  return knex.schema.dropTable("tags");
};
