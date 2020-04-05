/**
 * bysrkh
 * @2020 GNU GPL v2, Yogyakarta
 *
 * bysrkh@gmail.com
 */

const moment = require('moment')
const LogMessageBuilder = require('../util/log-message-builder')
/*
    define middleware for logging
 */
module.exports = (req, res, next) => {
    const currentTime = moment()

    console.log(
        new LogMessageBuilder(req.method, req.originalUrl, req.headers['accept-language'], req.headers['accept'], req.body, currentTime)
            .toString()
    )

    next()
}