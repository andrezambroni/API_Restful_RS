exports.up = function (knex) {
  // Cria a tabela 'links'
  return knex.schema.createTable("links", (table) => {
    table.increments("id").primary(); // Coluna 'id' auto-incrementada e chave primária
    table.text("url").notNullable(); // Coluna 'url' do tipo texto e não nula
    table
      .integer("note_id")
      .references("id")
      .inTable("notes")
      .onDelete("CASCADE"); // Coluna 'note_id' referenciando 'id' da tabela 'notes' com delete em cascata
    table.timestamp("created_at").defaultTo(knex.fn.now()); // Coluna 'created_at' com valor padrão de data/hora atual
  });
};

exports.down = function (knex) {
  // Deleta a tabela 'links'
  return knex.schema.dropTable("links");
};
