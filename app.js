const app = require('express')()
const bodyParser = require('body-parser')

const todo = require('./router/todo')
const login = require('./router/login')
const register = require('./router/register')
const user = require('./router/user')
const globalErrorLog = require('./middleware/global-error-log')

/*
    define application to listen
 */
const port = 3000

app.use(bodyParser.json())

/*
    apply routing file
 */
app.use('/todo', todo)
app.use('/login', login)
app.use('/register', register)
app.use('/user', user)
/*
    apply custom error middleware
 */
app.use(globalErrorLog)

/*
    run application
 */
app.listen(3000, () => console.log(`listen to the port ${port}`))