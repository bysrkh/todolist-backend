const {STRING, UUIDV1} = require('sequelize')

/*
    define model for table : todo
 */
module.exports = (conn, Sequelize) => {
    const {STRING} = Sequelize

    const user = conn.define(
        'user',
        {
            id: {
                type: STRING,
                primaryKey: true,
                defaultValue: UUIDV1
            },
            username: {
                type: STRING,
                unique: true
            },
            password: STRING,
        }, {
            tableName: 'user',
            timestamps: false,
        }
    )

    return user
}


