/**
 * @ 2019, bysrkh
 * bysrkh.com
 */
const Sequelize = require('sequelize')

const conn = require('./connection')
const userModel = require('../../model/user')
const roleModel = require('../../model/role')
const todoModel = require('../../model/todo')

const user = userModel(conn, Sequelize)
const role = roleModel(conn, Sequelize)
const todo = todoModel(conn, Sequelize)

user.belongsTo(role, {foreignKey: 'role_id'})

const database = {user, role, todo}

module.exports = database