const router = require('express').Router()
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')

const config = require('../util/secret')
const {user, role} = require('../util/db/database')
const {ModelNotFoundException} = require('../util/error/Error')


router.post('/', (req, res, next) => (
    user.findOne({where: {...req.body}, include: [{model: role}]})
        .then(existingUser => {
            console.log(JSON.stringify(existingUser))

            if(!existingUser)
                throw new ModelNotFoundException(`User with username : ${existingUser.username} is not found`)

            const token = jwt.sign({username: existingUser.username, role: existingUser.role.role}, config.secret, {expiresIn: '1h'})

            res.status(200).json({
                status: 200,
                message: 'token has been successfully generated',
                token: token
            })

        }).catch(next)
))

module.exports = router
