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
const cors = require('cors')
const bodyParser = require('body-parser')
const startingLong = require('./middleware/startingLog')

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