/**
 * bysrkh
 * @2020 GNU GPL v2, Jogja - Indonesia
 *
 * bysrkh@gmail.com
 */
const userModel = require('../model/userModel')
const AppError = require('../util/AppError')
const catchAsync = require('../util/catchAsync')

const create = catchAsync(async (req, res, next) => {
    const user = await userModel.create({...req.body})
    res.json({message: `User with id : ${user.id} has been created`})
})

// TODO: Available soon
// const login = catchAsync(async (req, res, next) => {
//     const user = await userModel.findOne({where: {username: req.body.username}})
//     user || next(new AppError({
//         status: 404,
//         message: `User with username ${req.body.username} is not found`
//     }))
//     user.isPasswordCorrect(req.body.password) && next(new AppError({
//         status: 402,
//         message: `Incorrect password`
//     }))
//
//     //bikin jwt
// })

const find = catchAsync(async (req, res, next) => {
    const user = await userModel.findByPk(req.params.id, {attributes: {exclude: ['password']}})
    user ?
        res.json({...user.toJSON()}) :
        next(new AppError({
            status: 404,
            message: `User with id : ${req.params.id} is not found`
        }))
})

const findAll = catchAsync(async (req, res, next) => {
    const users = await userModel.findAll({attributes: {exclude: ['password']}})
    res.json([...users])
})

const update = catchAsync(async (req, res, next) => {
    (req.body.password && req.body.confirmPassword) && (req.body = {...req.body, isModified: true})
    const [success] = await userModel.update(
        {...req.body},
        {where: {id: req.body.id}, individualHooks: true}
    )
    success ?
        res.json({message: `User ID : ${req.body.id} has been updated`}) :
        next(new AppError({
            status: 404,
            message: `User ID : ${req.body.id} is not found`
        }))
})

const remove = catchAsync(async (req, res, next) => {
        const success = await userModel.destroy({where: {id: req.params.id}})
        success ?
            res.json({message: `User ID : ${req.params.id} has been deleted`}) :
            next(new AppError({
                status: 404,
                message: `User ID : ${req.params.id} is not found`
            }))
    }
)

module.exports = {create, find, findAll, update, remove}

