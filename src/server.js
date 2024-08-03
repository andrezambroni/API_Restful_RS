require('dotenv/config') // Carrega variáveis de ambiente do arquivo .env
const express = require('express')
const routes = require('./routes')
const AppError = require('./utils/AppError')
const handleErrors = require('./utils/handleErrors')
const sqliteConnection = require('./database/sqlite')

const app = express()

app.use(express.json()) // Middleware para parsear JSON

sqliteConnection() // Conecta ao banco de dados SQLite

app.use(routes) // Usa as rotas definidas no arquivo routes

// Middleware para lidar com erros
app.use((err, req, res, next) => {
  handleErrors(err, req, res, next)
})

// Define a porta do servidor
const PORT = process.env.PORT || 3333
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})