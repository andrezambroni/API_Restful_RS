const sqliteConnection = require("../database/sqlite");
const AppError = require("../utils/AppError");
const { hash, compare } = require("bcryptjs");

class UsersController {
  // Método para criar um novo usuário
  async create(request, response) {
    const { name, email, password } = request.body;

    // Conecta ao banco de dados SQLite
    const database = await sqliteConnection();
    // Verifica se o usuário já existe pelo email
    const checkUserExists = await database.get(
      "SELECT * FROM users WHERE email = (?)",
      [email]
    );

    if (checkUserExists) {
      throw new AppError("Este e-mail já está em uso.");
    }

    // Criptografa a senha
    const hashedPassword = await hash(password, 8);

    // Insere o novo usuário no banco de dados
    await database.run(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, hashedPassword]
    );

    return response.status(201).json();
  }

  // Método para atualizar um usuário existente
  async update(request, response) {
    const { name, email, password, old_password } = request.body;
    const { id } = request.params;

    // Conecta ao banco de dados SQLite
    const database = await sqliteConnection();
    // Obtém o usuário pelo ID
    const user = await database.get("SELECT * FROM users WHERE id = (?)", [id]);

    if (!user) {
      throw new AppError("Usuário não encontrado");
    }

    // Verifica se o email já está em uso por outro usuário
    const userWithUpdatedEmail = await database.get(
      "SELECT * FROM users WHERE email = (?)",
      [email]
    );

    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
      throw new AppError("Este e-mail já está em uso.");
    }

    // Atualiza os campos do usuário
    user.name = name ?? user.name;
    user.email = email ?? user.email;

    // Verifica se a senha antiga foi fornecida para atualizar a senha
    if (password && !old_password) {
      throw new AppError(
        "Você informar a senha antiga para definir a nova senha"
      );
    }

    if (password && old_password) {
      const checkOldPassword = await compare(old_password, user.password);

      if (!checkOldPassword) {
        throw new AppError("A senha antiga não confere.");
      }

      user.password = await hash(password, 8);
    }

    // Atualiza o usuário no banco de dados
    await database.run(
      `
      UPDATE users SET
      name = ?,
      email = ?,
      password = ?,
      updated_at = DATETIME('now')
      WHERE id = ?`,
      [user.name, user.email, user.password, id]
    );

    return response.json();
  }
}

module.exports = UsersController;
