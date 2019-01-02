const todo = require('./todo')
const app = require('express')()
const globalErrorLog = require('./middleware/global-error-log')

app.use('/todo', todo)

app.use(globalErrorLog)

app.listen(3000, () => console.log('listen to the port 3000'))