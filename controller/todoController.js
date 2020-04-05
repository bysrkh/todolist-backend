/**
 * bysrkh
 * @2020 GNU GPL v2, Jogja - Indonesia
 *
 * bysrkh@gmail.com
 */
const todo = require('../model/todo')
const AppError = require('../util/AppError')
const catchAsync = require('../util/catchAsync')

const create = catchAsync(async (req, res, next) => {
    const todoCreate = await todo.create({...req.body})
    res.json({message: `todo with id : ${req.body.id} has been created`})
})

const put = catchAsync(async (req, res, next) => {
    const [updateSuccess] = await todo.update(
        {...req.body},
        {where: {id: req.body.id}}
    )
    updateSuccess ?
        res.json({message: `todo with id : ${req.body.id} has been updated`}) :
        next(new AppError({
            status: 404,
            message: `Todo ID : ${req.body.id} is not found`
        }))
})

const remove = catchAsync(async (req, res, next) => {
        const removeSuccess = await todo.destroy({where: {id: req.params.id}})
        removeSuccess ?
            res.json({message: `todo with id ${req.params.id} has been deleted`}) :
            next(new AppError({
                status: 404,
                message: `Todo ID : ${req.params.id} is not found`
            }))
    }
)

const findAll = catchAsync(async (req, res, next) => {
    const todoList = await todo.findAll({
        offset: req.query.pageNumber * req.query.pageSize,
        limit: req.query.pageSize,
        order: [['createdDate', 'DESC']]
    })
    const totalTodoList = await todo.count()

    res.json({
        data: [...todoList],
        pageSize: parseInt(req.query.pageSize),
        pageNumber: parseInt(req.query.pageNumber),
        total: totalTodoList
    })
})

const find = catchAsync(async (req, res, next) => {
    const todoDetail = await todo.findOne({where: {id: req.params.id}})
    todoDetail ?
        res.json({...todo}) :
        next(new AppError({
            status: 404,
            message: `Todo ID : ${req.path.params} is not found`
        }))
})

module.exports = {create, put, remove, findAll, find}

