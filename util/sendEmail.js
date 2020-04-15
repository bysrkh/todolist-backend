/**
 * bysrkh
 * @2020 GNU GPL v2, Yogyakarta
 *
 * bysrkh@gmail.com
 */
const nodemailer = require('nodemailer')

module.exports = async target => {
    var transporter = nodemailer.createTransport({
        host: 'smtp.mailtrap.io',
        port: 2525,
        auth: {
            user: 'ebacd60bcc9329',
            pass: '067d60facc11b6'
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