const sqlite3 = require("sqlite3");
const { open } = require("sqlite");
const path = require("path");

async function sqliteConnection() {
  // Abre uma conexão com o banco de dados SQLite
  const db = await open({
    filename: path.resolve(__dirname, "database.db"), // Caminho para o arquivo do banco de dados
    driver: sqlite3.Database, // Driver do SQLite
  });

  return db;
}

module.exports = sqliteConnection;
