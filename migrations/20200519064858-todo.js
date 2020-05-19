/**
 * bysrkh
 * @2020 GNU GPL v2, Yogyakarta
 *
 * bysrkh@gmail.com
 */

'use strict'

var dbm
var type
var seed

/**
 * We receive the dbmigrate dependency from dbmigrate initially.
 * This enables us to not have to rely on NODE_PATH.
 */
const setup = (options, seedLink) => {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
}

const up = (db, callback) => {
  db.createTable(
      'todo',
      {
        id: {type: 'uuid', primaryKey: true},
        title: {type: 'varchar(50)', allowNull: false},
        complete: {type: 'boolean', allowNull: false},
        created_date: {type: 'timestamp', allowNull: false},
        modified_date: {type: 'timestamp', allowNull: false},
      },
      callback)
}

const down = (db, callback) => db.dropTable('todo', callback)

const _meta = {
  "version": 1
}

module.exports = {setup, up, down, _meta}
