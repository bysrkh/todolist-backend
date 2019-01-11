const router = require('express').Router()
const uuid = require('uuid/v1')

const {user, role} = require('../util/db/database')

router.post('/', (req, res, next) => {

    let createdUser = null

    user.create({...req.body, role_id: 'e244aef1-14bc-11e9-9683-45d84bac4bf3'}, {include: [{model: role}]})
        .then((newUser) => {return newUser})
        .then(({id}) => {

            res.status(201)
                .json({status: 201, message: `User with ${id} is just being created`})
        })
        .catch(next)
})

module.exports = router
