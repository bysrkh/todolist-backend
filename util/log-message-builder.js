/**
 * bysrkh
 * @2019 GNU GPL v2, Yogyakarta
 *
 * bysrkh@gmail.com
 */

/* define format */
const utcFormat = 'YYYY-MM-DD HH:mm:ss.SSZ zz'
const localeFormat = 'LLLL'
const unixFormat = 'X'

/* log message builder */
class LogMessageBuilder {
    constructor(method, uri, locale, type, payload, currentTime) {
        this.method = method
        this.uri = uri
        this.payload = payload
        this.locale = locale
        this.type = type
        this.startTimeExecution = currentTime
        this.startTimeInUTCExecution = currentTime
        this.startTimeInUnixExecution = currentTime
    }
}

LogMessageBuilder.prototype.toString = function() {
    console.debug(
        `{\u000A\u0009'method': '${this.method}',`+
        `\u000A\u0009'uri': '${this.uri}',`+
        `\u000A\u0009'locale': '${this.locale}',`+
        `\u000A\u0009'type': '${this.type}',`+
        `\u000A\u0009'payload': '${JSON.stringify(this.payload)}',`+
        `\u000A\u0009'startTimeExecution': '${this.startTimeExecution.format(localeFormat)}', \u000A\u0009'startTimeInUTCExecution': '${this.startTimeInUTCExecution.utc().format(utcFormat)}', \u000A\u0009'startTimeInUnixExecution': ${this.startTimeInUnixExecution.format(unixFormat)}\u000A}`)
}

module.exports = LogMessageBuilder