/**
 * bysrkh
 * @2020 GNU GPL v2, Yogyakarta
 *
 * bysrkh@gmail.com
 */
const AppError = require('./../util/AppError')

const handleValidationErrors = error => { console.log(JSON.stringify(error)); return {
    status: 400,
    message: 'Validation error',
    errors: Object.values(error).map(({path: field, value, message}) => ({
        field, value, message
    }))
}}


const globalErrorController = (err, req, res, next) => {
    console.log(err.stack)

    console.log(JSON.stringify(err))

    if (err.name === 'SequelizeUniqueConstraintError' || err.name == 'SequelizeValidationError')
        err = handleValidationErrors(err.errors)

    res.status(err.status || 500)
        .json({...err, status: 'Fail'})
}

const apiNotFoundController = (req, res, next) => next(new AppError({
    status: 200,
    message: `Request API ${req.originalUrl} is not found`
}))

module.exports = {globalErrorController, apiNotFoundController}
