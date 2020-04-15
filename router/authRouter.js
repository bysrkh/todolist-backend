/**
 * bysrkh
 * @2020 GNU GPL v2, Jogja - Indonesia
 *
 * bysrkh@gmail.com
 */
const authController = require('../controller/authController')
const express = require('express')
const router = express.Router()

router
    .route('/login')
    .post(authController.login)

router
    .route('/register')
    .post(authController.register)

router
    .route('/resetPassword/:resetToken')
    .patch(authController.resetPassword)

router
    .route('/forgotPassword')
    .post(authController.forgotPassword)

module.exports = router

