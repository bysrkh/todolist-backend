const moment = require('moment')
/*
    define middleware for logging
 */
module.exports = (req, res, next) => {
    currentTime = moment()

    console.info(`{'method': '${req.method}', 'uri': '${req.originalUrl}', 'payload': '${JSON.stringify(req.body)}', 'startTimeExecution': '${currentTime.format('DD-MM-YYYY hh:mm:ss')}', 'startTimeInUTCExecution': '${currentTime.format('YYYY-MM-DD HH:mm:ssZZ')}'} `)

    next()
}