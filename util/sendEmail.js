/**
 * bysrkh
 * @2020 GNU GPL v2, Yogyakarta
 *
 * bysrkh@gmail.com
 */
const nodemailer = require('nodemailer')

module.exports = target => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.mailtrap.io',
        port: 25,
        auth: {
            username: 'ebacd60bcc9329',
            password: '067d60facc11b6'
        }
    })

    const mailOptions = {
        from: 'Kasyfillah Haidi <mail@bysrkh.com>',
        to: target.email,
        subject: target.subject,
        text: target.content
    }
}