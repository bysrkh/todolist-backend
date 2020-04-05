/**
 * bysrkh
 * @2020 GNU GPL v2, Jogja - Indonesia
 *
 * bysrkh@gmail.com
 */
const errorController = require('../controller/errorController')
const express = require('express')
const router = express.Router()

router
    .route('*')
    .all(errorController.apiNotFoundController)

module.exports = router

