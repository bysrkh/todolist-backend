/**
 * bysrkh
 * @2020 GNU GPL v2, Jogja - Indonesia
 *
 * bysrkh@gmail.com
 */
const moment = require('moment')

const buildCurrentDateInUtc = () => {
    const currentDateInUtc = moment().utc()

    return new Date(
        currentDateInUtc.year(),
        currentDateInUtc.month(),
        currentDateInUtc.date(),
        currentDateInUtc.hours(),
        currentDateInUtc.minutes(),
        currentDateInUtc.seconds(),
        currentDateInUtc.milliseconds()
    )
}

module.exports = {buildCurrentDateInUtc}