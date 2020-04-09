/**
 * bysrkh
 * @2020 GNU GPL v2, Yogyakarta
 *
 * bysrkh@gmail.com
 */

const Sequelize = require('sequelize')

module.exports = new Sequelize(
    'todo', 'postgres', 'postgres',
    {
        host: 'localhost',
        port: 5432,
        dialect: 'postgres'
    }
)

