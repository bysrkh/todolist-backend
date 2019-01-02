const router = require('express').Router()
const todo = require('./model/todo')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const globalTimeLog = require('./middleware/global-time-log')
const globalErrorLog = require('./middleware/global-error-log')
const uuid = require('uuid/v1')

/*
    apply third party middleware
 */
router.use(bodyParser.json())
router.use(methodOverride())

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


router.get('/', (req, res) => (
    todo
        .findAll()
        .then((todos = []) => res.json(todos))
))

router.get('/:id', (req, res) => (
    todo
        .findOne({where: {id: req.params.id}})
        .then(todo => res.json(todo))
))
router.delete('/:id', (req, res, next) => (
    todo
        .destroy({where: {id: req.params.id}})
        .then((status, error) => {console.log('status : ' + status); status ? res.json({message: `todo with id ${req.params.id} has been deleted`}) : next(error);})
))

module.exports = router