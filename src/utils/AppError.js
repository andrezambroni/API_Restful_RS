class AppError {
  // Construtor da classe AppError
  constructor(message, statusCode = 400) {
    this.message = message // Mensagem de erro
    this.statusCode = statusCode // Código de status HTTP
  }
}

module.exports = AppError