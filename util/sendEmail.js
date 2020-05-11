/**
 * bysrkh
 * @2020 GNU GPL v2, Yogyakarta
 *
 * bysrkh@gmail.com
 */
const nodemailer = require('nodemailer')

module.exports = async target => {
    var transporter = nodemailer.createTransport({
        host: process.env.MAIL_URL,
        port: process.env.MAIL_PORT,
        auth: {
            user: process.env.MAIL_USERNAME,
            pass: process.env.MAIL_PASSWORD
        }
    })

    const mailOptions = {
        from: 'Kasyfillah Haidi <mail@bysrkh.com>',
        to: target.email,
        subject: target.subject,
        text: target.content
    }

    await transporter.sendMail(mailOptions)
}