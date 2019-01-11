/*
    define model for table : todo
 */
module.exports = (conn, Sequelize) => {
    const {STRING} = Sequelize

    const todo = conn.define(
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
}