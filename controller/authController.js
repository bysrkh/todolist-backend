/**
 * bysrkh
 * @2020 GNU GPL v2, Jogja - Indonesia
 *
 * bysrkh@gmail.com
 */
const jwt = require('jsonwebtoken')
const {promisify} = require('util')
const moment = require('moment')

const userModel = require('../model/userModel')
const AppError = require('../util/AppError')
const catchAsync = require('../util/catchAsync')

const THIRTEEN_MINUTES_CONSTANT = 30 * 60 * 1e3

const login = catchAsync(async (req, res, next) => {
    if (!req.body.username || !req.body.password)
        return next(new AppError({
            status: 402,
            message: 'Password and Username can not be null'
        }))
    const user = await userModel.findOne({where: {username: req.body.username}})
    if (!user)
        return next(new AppError({
            status: 404,
            message: `User with username ${req.body.username} is not found`
        }))
    if (!await user.isPasswordCorrect(req.body.password))
        return next(new AppError({
            status: 402,
            message: `Incorrect password`
        }))

    const token = await promisify(jwt.sign)({id: user.id}, "secret", {expiresIn: THIRTEEN_MINUTES_CONSTANT})

    res.json({...user.toJSON(), password: undefined, token})

})

const forgotPassword = catchAsync(async (req, res, next) => {
    const user = await userModel.findOne({
        where: {email: req.body.email}
    })
    if (!user)
        return next(new AppError({
            status: 402,
            message: `User with e-mail ${req.body.username} is not found`
        }))
    const resetToken = await user.resetPassword()
    await user.save();

    res.json({id: user.id, resetToken: resetToken})
})

const register = catchAsync(async (req, res, next) => {

    console.log(`perhatikan ini di ${moment()}`)
    const user = await userModel.create({...req.body, role: 'user'})

    const token = await promisify(jwt.sign)({id: user.id}, "secret", {expiresIn: 30000})

    res.json({...user.toJSON(), password: undefined, confirmPassword: undefined, token})

})

const protect = catchAsync(async (req, res, next) => {
    const token = req.headers.authorization && req.headers.authorization.startsWith('Bearer') ?
        req.headers.authorization.split(' ')[2] :
        undefined

    if (!token)
        return next(new AppError({
            status: 401,
            message: `User ID ${decoded.id} has invalid token`
        }))
    console.log('the token' + token)
    const decoded = await promisify(jwt.verify)(token, 'secret')
    const user = await userModel.findByPk(decoded.id)
    console.log(decoded)
    if (!user)
        return next(new AppError({
            status: 401,
            message: `User ID ${decoded.id} doesn't exist`
        }))
    console.log('aku disini engkau disana')
    if (user.isPasswordModified(decoded.iat)) {
        return next(new AppError({
            status: 401,
            message: `User ID ${decoded.id} already changed the password`
        }))
    }

    req.user = user
    next()

})

const restrictTo = (...roles) => catchAsync(async (req, res, next) => {
    if (!roles.includes(req.user.role))
        return next(new AppError({
            status: 403,
            message: `User ID${req.user.id} does not have role permission to acess this URI`
        }))
    next()
})


module.exports = {protect, restrictTo, login, register, forgotPassword}

