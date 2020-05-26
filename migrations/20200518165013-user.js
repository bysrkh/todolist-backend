/**
 * bysrkh
 * @2020 GNU GPL v2, Yogyakarta
 *
 * bysrkh@gmail.com
 */

'use strict';

var dbm, type, seed

/**
 * We receive the dbmigrate dependency from dbmigrate initially.
 * This enables us to not have to rely on NODE_PATH.
 */
const setup = (options, seedLink) => {
    dbm = options.dbmigrate
    type = dbm.dataType
    seed = seedLink
}

const up = (db, callback) => {
    db.createTable(
        'user',
        {
            id: {type: 'uuid', primaryKey: true},
            username: {type: 'varchar(16)', allowNull: false, unique: true},
            password: {type: 'varchar(100)', allowNull: false, unique: true},
            email: {type: 'varchar(100)', allowNull: false, unique: true},
            file_name: {type: 'varchar(100)', allowNull: false},
            file_bucket: {type: 'varchar(100)', allowNull: false},
            created_date: {type: 'timestamp', allowNull: false},
            modified_date: {type: 'timestamp', allowNull: false},
            role: {type: 'varchar(8)', allowNull: false},
            modified_password_date: 'timestamp',
            password_reset_token: {type: 'timestamp', unique: true},
            password_reset_expiry_date: {type: 'timestamp'}
        },
        callback)
}

const down = (db, callback) => db.dropTable('user', callback)

const _meta = {
    "version": 1
}

module.exports = {setup, up, down, _meta}
