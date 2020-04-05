/**
 * bysrkh
 * @2020 GNU GPL v2, Yogyakarta
 *
 * bysrkh@gmail.com
 */

const todoRouter = require('./router/todoRouter')
const error = require('./controller/errorController')
const app = require('express')()
const cors = require('cors')
const bodyParser = require('body-parser')
const globalTimeLog = require('./middleware/global-time-log')

app.use(bodyParser.json())
app.use(globalTimeLog)
app.use('/todo', todoRouter)
app.all('*', error.apiNotFoundController)
app.use(cors())
app.use(error.globalErrorController)

module.exports = app