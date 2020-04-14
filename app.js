/**
 * bysrkh
 * @2020 GNU GPL v2, Yogyakarta
 *
 * bysrkh@gmail.com
 */

const todoRouter = require('./router/todoRouter')
const userRouter = require('./router/userRouter')
const authRouter = require('./router/authRouter')
const error = require('./controller/errorController')
const app = require('express')()
const pg = require('pg')
const cors = require('cors')
const bodyParser = require('body-parser')
const startingLong = require('./middleware/startingLog')
const moment = require('moment')

/**
 * postgresql date conversion issue fixing
 *
 * see: https://github.com/sequelize/sequelize/issues/2572#issuecomment-428493279
 * */
pg.types
    .setTypeParser(1114, str => !str || moment(str + '+0000').valueOf())

/* apply rest json api consumption */
app.use(bodyParser.json())

/* apply request endpoint starting call log */
app.use(startingLong)

/* define routing */
app.use('/todo', todoRouter)
app.use('/user', userRouter)
app.use('/user', authRouter)
app.all('*', error.apiNotFoundController)

app.use(cors())
app.use(error.globalErrorController)

module.exports = app