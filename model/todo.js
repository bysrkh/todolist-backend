const {STRING} = require('sequelize')
const conn = require('../util/db')

/*
    define model for table : todo
 */
module.exports = conn.define(
    'todo',
    {
        id: {
            type: STRING,
            primaryKey: true
        },
        description: {
            type: STRING
        }
    }, {
        tableName: 'todo',
        timestamps: false
    }
    )