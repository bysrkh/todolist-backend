const todo = require('./todo')
const app = require('express')()

app.use('/todo', todo)

app.listen(3000, () => console.log('listen to the port 3000'))