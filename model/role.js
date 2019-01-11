const {STRING, UUIDV1} = require('sequelize')

/*
    define model for table : todo
 */
module.exports = (conn, Sequelize) => {
    const {STRING} = Sequelize

    const role = conn.define(
        'role',
        {
            id: {
                type: STRING,
                primaryKey: true,
                defaultValue: UUIDV1
            },
            role: {
                type: STRING,
                unique: true
            }
        }, {
            tableName: 'role',
            timestamps: false,
        }
    )

    return role
}



