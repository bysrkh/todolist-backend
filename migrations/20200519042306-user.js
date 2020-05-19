/**
 * bysrkh
 * @2020 GNU GPL v2, Yogyakarta
 *
 * bysrkh@gmail.com
 */

'use strict';
const path = require('path')
require('dotenv').config({
    path: path.resolve(process.cwd(), '.env'),
    debug: process.env.ENV_INFO === 'DEV'
})
const bcrypt = require('bcrypt')
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
    bcrypt.hash(process.env.JWT_SECRET, 12, (er, hashPassword) => {
        const loadUUIDModule = `CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`
        const insertDataToUser = `INSERT INTO public.user (id, username, password, email, file_name, file_bucket, created_date, modified_date, role) VALUES (uuid_generate_v4(), 'admin', '${hashPassword}', 'bysrkh@gmail.com', 'todolist-image', 'winda_nurmala.jpeg', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'admin');`
        db.runSql(`${loadUUIDModule}${insertDataToUser}`, callback)
    })
}

const down = (db, callback) => db.runSql('DELETE FROM public.user', callback)

const _meta = {
    "version": 1
}

module.exports = {setup, up, down, _meta}
