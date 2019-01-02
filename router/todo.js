const router = require('express').Router()
const bodyParser = require('body-parser')
const uuid = require('uuid/v1')

const globalTimeLog = require('../middleware/global-time-log')
const todo = require('../model/todo')
const ModelNotFoundException = require('../util/error/ModelNotFoundException')
/*
    apply third party middleware
 */
router.use(bodyParser.json())

/*
    apply custom global middleware
 */
router.use(globalTimeLog)

/*
    define routing for todo operation
 */
router.post('/', (req, res) => (
    todo
        .create({...req.body, id: uuid()})
        .then(({id}) => res.json({message: `todo with id ${id} has been created`}))
))

router.put('/', (req, res) => (
    todo
        .update({...req.body}, {where: {id: req.body.id}})
        .then(({id}) => res.json({message: `todo with id ${id} has been updated`}))
))

router.delete('/:id', (req, res, next) => (
    todo
        .destroy({where: {id: req.params.id}})
        .then(({status}) => {
            if(!status)
                throw new ModelNotFoundException(`Todo : ${req.params.id} is not found`)

            res.json({message: `todo with id ${req.params.id} has been deleted`})
        })
        .catch(next)
))

router.get('/', (req, res) => (
    todo
        .findAll()
        .then((todos = []) => res.json(todos))
))

router.get('/:id', (req, res, next) => (
    todo
        .findOne({where: {id: req.params.id}})
        .then(todo => {
            if(!todo)
                throw new ModelNotFoundException(`Todo : ${req.params.id} is not found`)

            res.json(todo)
        }).catch(next)
))

module.exports = router