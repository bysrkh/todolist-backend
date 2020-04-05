/**
 * bysrkh
 * @2020 GNU GPL v2, Yogyakarta
 *
 * bysrkh@gmail.com
 */

module.exports = class AppError {
    constructor({status, message}) {
        this.status = status
        this.message = message;

        Error.captureStackTrace(this, this.constructor)
    }
}