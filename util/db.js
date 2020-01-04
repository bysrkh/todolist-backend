const Sequelize = require('sequelize')

module.exports = new Sequelize(
    'postgres://postgres:postgres@localhost:5432/todo'
)

