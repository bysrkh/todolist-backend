const jwt = require('jsonwebtoken')
const config = require('../util/secret')
const {AuthorizationException} = require('../util/error/Error')

module.exports = (req, res, next) => {
    let token = req.headers['x-access-token'] || req.headers['authorization']

    if (token.startsWith('Bearer '))
        token.slice(7, token.length)

    if(token) {
        jwt.verify(token, config.secret, (err, authenticatedUser) => {
            if(err) {
                throw new AuthorizationException('Token is not valid')
            } else {
                req.authenticatedUser = authenticatedUser
                next()
            }
        })
    } else {
        throw new AuthorizationException('Token is not supplied')
    }

}