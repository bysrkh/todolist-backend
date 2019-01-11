const Sequelize = require('sequelize')

const connection = new Sequelize(
    'todolist',
    'postgres',
    'P@ssw0rd',
    {
      host: 'localhost',
      dialect: 'postgres',
      operatorsAliases: false,
      pool: {
          max: 5,
          min: 0,
          acquire: 30000,
          idle: 10000
      }
    })

module.exports = connection