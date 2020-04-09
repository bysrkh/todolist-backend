/**
 * bysrkh
 * @2020 GNU GPL v2, Yogyakarta
 *
 * bysrkh@gmail.com
 */

const {STRING, DATE, NOW, VIRTUAL} = require('sequelize')
const conn = require('../util/db')
uuid = require('uuid/v1')
bcrypt = require('bcrypt')

/*
    define model for table : user table
 */
const user = conn.define(
    'user',
    {
        id: {
            type: STRING,
            primaryKey: true,
            defaultValue: uuid()
        },
        username: {
            type: STRING,
            allowNull: false,
            validate: {notEmpty: {msg: 'Username can not be empty'}}
        },
        password: {
            type: STRING,
            allowNull: false,
            validate: {notEmpty: {msg: 'Password can not be empty'}}
        },
        confirmPassword: {
            type: VIRTUAL,
            allowNull: false,
            validate: {
                notEmpty: {msg: 'Confirm Password can not be empty'},
                isMatch(confirmPassword) {
                    if (confirmPassword !== this.password)
                        throw new Error('All passwords must match')
                }
            }
        },
        isModified: VIRTUAL,
        createdDate: {
            field: 'created_date',
            type: DATE,
            defaultValue: NOW
        }
    }, {
        tableName: 'user',
        timestamps: false,
        hooks: {
            beforeCreate: async (user) => {
                user.password = await bcrypt.hash(user.password, 12)
            }, beforeUpdate: async (user) => {
                user.isModified && (user.password = await bcrypt.hash(user.password, 12))
            }
        }
    }
)


module.exports = user;