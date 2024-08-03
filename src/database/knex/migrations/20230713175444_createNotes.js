exports.up = function (knex) {
  // Cria a tabela 'notes'
  return knex.schema.createTable("notes", (table) => {
    table.increments("id").primary(); // Coluna 'id' auto-incrementada e chave primária
    table.text("title").notNullable(); // Coluna 'title' do tipo texto e não nula
    table.text("description").notNullable(); // Coluna 'description' do tipo texto e não nula
    table
      .integer("user_id")
      .references("id")
      .inTable("users")
      .onDelete("CASCADE"); // Coluna 'user_id' referenciando 'id' da tabela 'users' com delete em cascata
    table.timestamp("created_at").defaultTo(knex.fn.now()); // Coluna 'created_at' com valor padrão de data/hora atual
    table.timestamp("updated_at").defaultTo(knex.fn.now()); // Coluna 'updated_at' com valor padrão de data/hora atual
  });
};

exports.down = function (knex) {
  // Deleta a tabela 'notes'
  return knex.schema.dropTable("notes");
};
