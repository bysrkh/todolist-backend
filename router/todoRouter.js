/**
 * bysrkh
 * @2020 GNU GPL v2, Jogja - Indonesia
 *
 * bysrkh@gmail.com
 */
const todoController = require('../controller/todoController')
const express = require('express')
const router = express.Router()

router
    .route('/')
    .post(todoController.create)
    .put(todoController.put)
    .get(todoController.findAll)

router.route('/:id')
    .get(todoController.find)
    .delete(todoController.remove)

module.exports = router

