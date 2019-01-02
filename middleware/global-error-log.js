const ModelNotFoundException = require('../util/error/ModelNotFoundException')

module.exports = (error, req, res, next) => {
    console.error(error.stack)

    if(error instanceof ModelNotFoundException)
        res
            .status(404)
            .json({
                status: 404,
                message: error.message
            })

    res
        .status(500)
        .json({
            status: 500,
            message: 'there is an internal server error. please contact the site administrator.!'
        })
}