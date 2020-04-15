/**
 * bysrkh
 * @2020 GNU GPL v2, Jogja - Indonesia
 *
 * bysrkh@gmail.com
 */
const moment = require('moment')

module.exports = function DateUtil(date) {
    this.currentDateInUtc = date ? moment(date) : moment.now()

    this.addDate = function (value) {
        this.currentDateInUtc = moment(this.currentDateInUtc.valueOf() + value)

        return this
    }

    this.toDate = function () {
        this.currentDateInUtc = this.currentDateInUtc.utc()

        return new Date(
            this.currentDateInUtc.year(),
            this.currentDateInUtc.month(),
            this.currentDateInUtc.date(),
            this.currentDateInUtc.hours(),
            this.currentDateInUtc.minutes(),
            this.currentDateInUtc.seconds(),
            this.currentDateInUtc.milliseconds())
    }
}