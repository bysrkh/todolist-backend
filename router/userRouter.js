/**
 * bysrkh
 * @2020 GNU GPL v2, Jogja - Indonesia
 *
 * bysrkh@gmail.com
 */
const userController = require('../controller/userController')
const express = require('express')
const router = express.Router()

router
    .route('/')
    .get(userController.findAll)
    .post(userController.create)
    .put(userController.update)

router
    .route('/:id')
    .get(userController.find)
    .delete(userController.remove)

module.exports = router

