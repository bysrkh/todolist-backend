/**
 * bysrkh
 * @2020 GNU GPL v2, Jogja - Indonesia
 *
 * bysrkh@gmail.com
 */
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const {promisify} = require('util')
const moment = require('moment')
const {Op} = require('sequelize')

const userModel = require('../model/userModel')
const AppError = require('../util/AppError')
const catchAsync = require('../util/catchAsync')
const sendEmail = require('../util/sendEmail')
const {userProperties} = require('../util/ObjectUtil')

const THIRTEEN_MINUTES_CONSTANT = 30 * 60 * 1e3

const login = catchAsync(async (req, res, next) => {
    if (!req.body.username || !req.body.password)
        return next(new AppError({
            status: 400,
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
            status: 400,
            message: `Incorrect password`
        }))

    const token = await promisify(jwt.sign)({id: user.id}, "secret", {expiresIn: THIRTEEN_MINUTES_CONSTANT})

    res.json({...user.toJSON(), password: undefined, token})

})

const forgotPassword = catchAsync(async (req, res, next) => {
    const user = await userModel.findOne({where: {email: req.body.email}})
    if (!user)
        return next(new AppError({
            status: 404, message: `User with e-mail ${req.body.username} is not found`
        }))

    const resetToken = await user.resetPassword()
    await user.save();

    try {
        const resetUrl = `${req.protocol}://${req.hostname}/resetPassword/${resetToken}`
        await sendEmail({
            email: user.email,
            subject: 'Resetting Password Password Request',
            content: `Please click the link to confirm reseting password ${resetUrl}`
        })

        res.json({
            id: user.id,
            resetToken,
            message: `User with username: ${user.username} is sent email instruction to reset password`
        })
    } catch (err) {
        user.passwordResetExpires = null
        user.passwordResetToken = null
        await user.save()

        return next(new AppError({
            status: 501, message: 'Error when sending e-mail'
        }))
    }
})

const resetPassword = catchAsync(async (req, res, next) => {
    const passwordResetToken = await crypto
        .createHash('sha256')
        .update(req.params.resetToken)
        .digest('hex')
    const user = await userModel.findOne({
        where: {passwordResetToken, passwordResetExpires: {[Op.gt]: new Date()}},
    })

    if (!user)
        return next(new AppError({
            status: 400, message: 'Token is invalid or expired'
        }))

    user.password = req.body.password
    user.confirmPassword = req.body.confirmPassword
    user.passwordResetExpires = null
    user.passwordResetToken = null
    user.isModified = true
    user.save()

    res
        .status(202)
        .json({
            id: user.id,
            message: `User with username : ${user.username} has been reset`
        })
})

const register = catchAsync(async (req, res, next) => {
    const user = await userModel.create({...req.body})

    const token = await promisify(jwt.sign)({id: req.body.id}, "secret", {expiresIn: 30000})

    res
        .status(201)
        .json({
            message: `User with username: ${req.body.username} has been created`,
            token: token
        })
})

const protect = catchAsync(async (req, res, next) => {
    const token = req.headers.authorization && req.headers.authorization.startsWith('Bearer') ?
        req.headers.authorization.split(' ')[2] :
        undefined

    if (!token)
        return next(new AppError({
            status: 401,
            message: `User has invalid token`
        }))
    console.log('the token' + token)
    const decoded = await promisify(jwt.verify)(token, 'secret')
    const user = await userModel.findByPk(decoded.id)
    if (!user)
        return next(new AppError({
            status: 401,
            message: `User ID ${decoded.id} doesn't exist`
        }))
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


module.exports = {protect, restrictTo, login, register, forgotPassword, resetPassword}

