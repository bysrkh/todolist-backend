/**
 * bysrkh
 * @2020 GNU GPL v2, Yogyakarta
 *
 * bysrkh@gmail.com
 */

const {STRING, DATE, NOW, BOOLEAN} = require('sequelize')
const conn = require('../util/db')
uuid = require('uuid/v1')

/*
    define model for table : todoModel table
 */
const todoModel = conn.define(
    'todo',
    {
        id: {
            type: STRING,
            primaryKey: true,
            defaultValue: uuid()
        },
        title: {
            type: STRING,
            allowNull: false,
            validate: {notEmpty: {msg: 'Title can not be empty'}}
        },
        complete: {
            type: BOOLEAN,
            defaultValue: false,
            allowNull: false,
        },
        createdDate: {
            field: 'created_date',
            type: DATE,
            defaultValue: NOW

        },
        modifiedDate: {
            field: 'modified_date',
            type: DATE,
            defaultValue: NOW

        }
    }, {
        tableName: 'todo',
        timestamps: false
    }
)

todoModel.prototype.completeMustNotBeUpdatedToFalse = function (candidateComplete) {
    return !this.complete || candidateComplete
}

module.exports = todoModel