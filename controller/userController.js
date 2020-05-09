/**
 * bysrkh
 * @2020 GNU GPL v2, Jogja - Indonesia
 *
 * bysrkh@gmail.com
 */
const jwt = require('jsonwebtoken')
const {promisify} = require('util')
const multer = require('multer')

const userModel = require('../model/userModel')
const AppError = require('../util/AppError')
const catchAsync = require('../util/catchAsync')
const {userProperties} = require('../util/ObjectUtil')
const storageUtil = require('../util/StorageUtil')

const create = catchAsync(async (req, res, next) => {
    const user = await userModel.create({...req.body})

    res
        .status(201)
        .json({message: `User with id : ${user.id} has been created`})
})

const find = catchAsync(async (req, res, next) => {
    const user = await userModel.findByPk(req.params.id, {attributes: {include: userProperties.showUser}})
    user ?
        res.json(user.toJSON()) :
        next(new AppError({status: 404, message: `User with id : ${req.params.id} is not found`}))
})

const findAll = catchAsync(async (req, res, next) => {
    const users = await userModel.findAll({attributes: {include: userProperties.showUser}})

    res.json([...users])
})

const update = catchAsync(async (req, res, next) => {
    (req.body.password && req.body.confirmPassword) && (req.body = {...req.body, isModified: true})
    (req.file) && (req.body = {...req.body, photo: req.file.filename})
    const [success] = await userModel.update(
        {...req.body},
        {where: {id: req.body.id}, individualHooks: true}
    )
    success ?
        res
            .status(202)
            .json({message: `User ID : ${req.body.id} has been updated`}) :
        next(new AppError({
            status: 404,
            message: `User ID : ${req.body.id} is not found`
        }))
})

const imageStorage = storageUtil({
    destination: (req, file, cb) => cb(null, 'public/image/user/'),
    filename: (req, file, cb) => cb(null, `user-image-${Date.now().valueOf()}.${file.mimetype.split('/')[1]}`)
})
const imageFilter = (req, file, callback) => (
    file.mimetype.startsWith('image') ?
        callback(null, true) :
        callback(new AppError({status: 400, message: 'Only upload image'}), false)
)

const imageConfiguration = multer({
    storage: imageStorage,
    fileFilter: imageFilter
})

const uploadImage = imageConfiguration.single('photo')

const remove = catchAsync(async (req, res, next) => {
        const success = await userModel.destroy({where: {id: req.params.id}})
        success ?
            res
                .status(204)
                .json({message: `User ID : ${req.params.id} has been deleted`}) :
            next(new AppError({
                status: 404,
                message: `User ID : ${req.params.id} is not found`
            }))
    }
)

module.exports = {create, find, findAll, update, uploadImage, remove}

