/**
 * bysrkh
 * @2020 GNU GPL v2, Yogyakarta
 *
 * bysrkh@gmail.com
 */

'use strict';

const uuid = require('uuid/v5')

var dbm
var type
var seed

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
    const loadUUIDModule = `CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`
    const insertDataToUser = `INSERT INTO public.user (id, username, password, email, file_name, file_bucket, created_date, modified_date, role) VALUES (uuid_generate_v4(), 'admin', 'admin', 'bysrkh@gmail.com', 'todolist-image', 'winda_nurmala.jpeg', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'admin');`
    db.runSql(`${loadUUIDModule}${insertDataToUser}`, callback)
}

const down = (db, callback) => db.runSql('DELETE FROM public.user', callback)

const _meta = {
    "version": 1
}

module.exports = {setup, up, down, _meta}
