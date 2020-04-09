/**
 * bysrkh
 * @2020 GNU GPL v2, Jogja - Indonesia
 *
 * bysrkh@gmail.com
 */
const todoModel = require('../model/todoModel')
const AppError = require('../util/AppError')
const catchAsync = require('../util/catchAsync')

const create = catchAsync(async (req, res, next) => {
    const todo = await todoModel.create({...req.body})
    res.json({message: `todo with id : ${req.body.id} has been created`})
})

const update = catchAsync(async (req, res, next) => {
    const [success] = await todoModel.update(
        {...req.body},
        {where: {id: req.body.id}, individualHooks: true}
    )
    success ?
        res.json({message: `todo with id : ${req.body.id} has been updated`}) :
        next(new AppError({
            status: 404,
            message: `Todo ID : ${req.body.id} can not be updated`
        }))
})

const remove = catchAsync(async (req, res, next) => {
        const success = await todoModel.destroy({where: {id: req.params.id}})
        success ?
            res.json({message: `todo with id ${req.params.id} has been deleted`}) :
            next(new AppError({
                status: 404,
                message: `Todo ID : ${req.params.id} is not found`
            }))
    }
)

const findAll = catchAsync(async (req, res, next) => {
    const todos = await todoModel.findAll({
        offset: req.query.pageNumber * req.query.pageSize,
        limit: req.query.pageSize,
        order: [['createdDate', 'DESC']]
    })

    console.log([...todos])
    const todoTotal = await todoModel.count()

    res.json({
        data: [...todos],
        pageSize: parseInt(req.query.pageSize),
        pageNumber: parseInt(req.query.pageNumber),
        total: todoTotal
    })
})

const find = catchAsync(async (req, res, next) => {
    const todo = await todoModel.findOne({where: {id: req.params.id}})
    todo ?
        res.json({...todo.toJSON()}) :
        next(new AppError({
            status: 404,
            message: `Todo ID : ${req.params.id} is not found`
        }))
})

module.exports = {create, update, remove, findAll, find}

