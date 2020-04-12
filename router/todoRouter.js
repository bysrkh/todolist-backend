/**
 * bysrkh
 * @2020 GNU GPL v2, Jogja - Indonesia
 *
 * bysrkh@gmail.com
 */
const express = require('express')
const router = express.Router()

const todoController = require('../controller/todoController')
const authController = require('../controller/authController')

router
    .route('/')
    .post(authController.protect, authController.restrictTo('user'), todoController.create)
    .put(authController.protect, authController.restrictTo('user'), todoController.update)
    .get(authController.protect, authController.restrictTo('user'), todoController.findAll)

router.route('/:id')
    .get(authController.protect, authController.restrictTo('user'), todoController.find)
    .delete(authController.protect, authController.restrictTo('user'), todoController.remove)

module.exports = router

