const path = require("path");

module.exports = {
  // Configuração para o ambiente de desenvolvimento
  development: {
    client: "sqlite3", // Define o cliente do banco de dados como SQLite
    connection: {
      filename: path.resolve(__dirname, "database.db"), // Caminho para o arquivo do banco de dados
    },
    pool: {
      afterCreate: (conn, cb) => {
        conn.run("PRAGMA foreign_keys = ON", cb); // Habilita chaves estrangeiras no SQLite
      },
    },
    migrations: {
      directory: path.resolve(__dirname, "migrations"), // Diretório onde as migrações estão localizadas
    },
    useNullAsDefault: true, // Define o uso de NULL como padrão para colunas não definidas
  },
};
