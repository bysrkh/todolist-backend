const userProperties = {
    showUser: ['id', 'username', 'email', 'role', 'createdDate'],
    showOnlyId: ['id'],
    showOnlyUsername: ['username']
}

const ONE_HOUR_CONSTANT = 60 * 60 * 1e3
const ONE_DAY_CONSTANT = 24 * ONE_HOUR_CONSTANT

module.exports = {userProperties, ONE_HOUR_CONSTANT, ONE_DAY_CONSTANT}