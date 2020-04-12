/**
 * bysrkh
 * @2020 GNU GPL v2, Yogyakarta
 *
 * bysrkh@gmail.com
 */

module.exports = fn => {
    return (req, res, next) => (
        fn(req, res, next).catch(next)
    )
}