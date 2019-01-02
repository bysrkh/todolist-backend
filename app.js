const todo = require('./router/todo')
const app = require('express')()
const globalErrorLog = require('./middleware/global-error-log')

/*
    define application to listen
 */
const port = 3000

/*
    apply routing file
 */
app.use('/todo', todo)
/*
    apply custom error middleware
 */
app.use(globalErrorLog)

/*
    run application
 */
app.listen(3000, () => console.log(`listen to the port ${port}`))