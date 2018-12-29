const Sequelize = require('sequelize')

module.exports = new Sequelize(
    'postgres://postgres:P@ssw0rd@localhost:5432/todolist'
)

