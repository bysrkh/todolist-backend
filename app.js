/**
 * bysrkh
 * @2020 GNU GPL v2, Yogyakarta
 *
 * bysrkh@gmail.com
 */

const app = require('express')()
const pg = require('pg')
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const moment = require('moment')
const rateLimit = require('express-rate-limit')
const helmet = require('helmet')
const xss = require('xss-clean')

const startingLog = require('./middleware/startingLog')

const todoRouter = require('./router/todoRouter')
const userRouter = require('./router/userRouter')
const authRouter = require('./router/authRouter')
const error = require('./controller/errorController')

/**
 * postgresql date conversion issue fixing
 *
 * see: https://github.com/sequelize/sequelize/issues/2572#issuecomment-428493279
 * */
pg.types
    .setTypeParser(1114, str => !str || moment(str + '+0000').valueOf())

/* apply non-persistent xss blocker by implementing X-Content-Security-Policy only */
app.use(helmet
    .contentSecurityPolicy({
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'"],
            styleSrc: ["'self'"]
        }
    }))

app.use(helmet.hidePoweredBy())

/* apply non-persistent xss blocker by implementing X-Frame-Options = deny*/
app.use(helmet.frameguard({action: 'deny'}))

/* apply non-persistent xss blocker by implementing X-Download-Options = noopen*/
app.use(helmet.ieNoOpen())

/* apply non-persistent xss blocker by implementing X-Content-Type-Options = nosiff */
app.use(helmet.noSniff())

/* apply non-persistent xss blocker by implementing X-XSS-Protections = 1; mode=block */
app.use(helmet.xssFilter({ setOnOldIE: true }))

/* apply non-persistent xss blocker by implementing X-DNS-Prefetch-Control = off */
app.use(helmet.dnsPrefetchControl())

/* apply persistent xss blocker by avoiding escape character in http request param, headers, and body*/
app.use(xss())

/* apply rate limit to prevent same ip does hit site too much */
app.use('/', rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1e3,
    message: 'Too many requests from this IP, please try again in an hour'
}))

/* apply cookies consumption */
app.use(cookieParser())

/* apply rest json api consumption and limit the size of json */
app.use(bodyParser.json({limit: '10kb'}))

/* apply request endpoint starting call log */
app.use(startingLog)



/* define routing */
app.use('/todo', todoRouter)
app.use('/user', userRouter)
app.use('/user', authRouter)

/* define error routing */
app.all('*', error.apiNotFoundController)

app.use(cors())
app.use(error.globalErrorController)

module.exports = app