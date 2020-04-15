/**
 * bysrkh
 * @2020 GNU GPL v2, Jogja - Indonesia
 *
 * bysrkh@gmail.com
 */
const express = require('express')
const router = express.Router()

const userController = require('../controller/userController')
const authController = require('../controller/authController')

router
    .route('/')
    .get(authController.protect, authController.restrictTo('admin'), userController.findAll)
    .post(authController.protect, authController.restrictTo('admin'), userController.create)
    .put(authController.protect, authController.restrictTo('admin'), userController.update)

router
    .route('/:id')
    .get(authController.protect, authController.restrictTo('admin'), userController.find)
    .delete(authController.protect, authController.restrictTo('admin'), userController.remove)

module.exports = router

