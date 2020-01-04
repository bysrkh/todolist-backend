const {STRING, DATE, NOW} = require('sequelize')
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
        title: {
            type: STRING
        },
        description: {
            type: STRING
        },
        createdDate: {
            field: 'created_date',
            type: DATE,
            defaultValue: NOW
        }
    }, {
        tableName: 'todo',
        timestamps: false
    }
)