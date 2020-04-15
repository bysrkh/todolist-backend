/**
 * bysrkh
 * @2020 GNU GPL v2, Yogyakarta
 *
 * bysrkh@gmail.com
 */

const {STRING, DATE, NOW, VIRTUAL} = require('sequelize')
uuid = require('uuid/v1')
bcrypt = require('bcrypt')
const crypto = require('crypto')
const conn = require('../util/db')
const DateUtil = require('../util/DateUtil')

const THIRTEEN_MINUTES_CONSTANT = 30 * 60 * 1e3

/*
    define model for table : user table
 */
const userModel = conn.define(
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
            unique: true,
            validate: {notEmpty: {msg: 'Username can not be empty'}}
        },
        email: {
            type: STRING,
            allowNull: false,
            validate: {
                notEmpty: {msg: 'Email can not be empty'},
                isEmail: {msg: 'Email is not proper format'}
            }
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
        role: {
            type: STRING,
            allowNull: false,
            defaultValue: 'user',
            validate: {
                notEmpty: {msg: 'Role can not be empty'},
                isIn: {
                    args: ['user', 'admin', 'public'],
                    msg: 'Role must be filled by user or admin or public as an input value'
                }
            }
        },
        isModified: VIRTUAL,
        passwordResetToken: {
            field: 'password_reset_token',
            type: STRING,
        },
        passwordResetExpires: {
            field: 'password_reset_expires',
            type: Date,
        },
        modifiedPasswordDate: {
            field: 'modified_password_date',
            type: DATE,
        },
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
                console.log('got here')
                user.password = await bcrypt.hash(user.password, 12)
            }, beforeUpdate: async (user) => {
                user.isModified && (user.password = await bcrypt.hash(user.password, 12))
            }
        }
    }
)

userModel.prototype.isPasswordCorrect = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
}
userModel.prototype.isPasswordModified = function (candidateTime) {
    return candidateTime < this.modifiedPasswordDate
}

userModel.prototype.resetPassword = async function () {
    const resetToken = await crypto
        .randomBytes(32)
        .toString('hex')
    this.passwordResetToken = await crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex')
    this.passwordResetExpires = new DateUtil()
        .addDate(THIRTEEN_MINUTES_CONSTANT)
        .toDate()

    return resetToken
}

module.exports = userModel;