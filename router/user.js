const router = require('express').Router()

const globalTimeLog = require('../middleware/global-time-log')
const globalAuth = require('../middleware/global-auth')
const {user, role} = require('../util/db/database')
const {ModelNotFoundException} = require('../util/error/Error')
/*
    apply third party middleware
 */

/*
    apply custom global middleware
 */
router.use(globalTimeLog)
router.use(globalAuth)

/*
    define routing for todo operation
 */
router.put('/', (req, res) => (
    user
        .update({...req.body}, {where: {id: req.body.id}})
        .then(({id}) => res.json({message: `user with id ${id} has been updated`}))
))

router.get('/', (req, res) => (
    user
        .findAll({include: [role]})
        .then((user = []) => res.json(user))
))

router.get('/:id', (req, res, next) => (
    user
        .findOne({where: {id: req.params.id}})
        .then(user => {
            if(!user)
                throw new ModelNotFoundException(`user : ${req.params.id} is not found`)

            res.json(user)
        }).catch(next)
))

module.exports = router