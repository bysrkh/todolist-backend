/**
 * bysrkh
 * @2020 GNU GPL v2, Yogyakarta
 *
 * bysrkh@gmail.com
 */

const Sequelize = require('sequelize')

module.exports = new Sequelize('postgres://postgres:postgres@localhost:5432/todo')

