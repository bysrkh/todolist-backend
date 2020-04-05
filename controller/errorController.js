/**
 * bysrkh
 * @2020 GNU GPL v2, Yogyakarta
 *
 * bysrkh@gmail.com
 */
const AppError = require('./../util/AppError')

const globalErrorController = (err, req, res, next) => {
    console.log(err.stack)

    res.status(err.status || 500)
        .json({status: 'Fail', message: err.message})
}

const apiNotFoundController = (req, res, next) => next(new AppError({status: 200, message: `Request API ${req.originalUrl} is not found`}))

module.exports = {globalErrorController, apiNotFoundController}
