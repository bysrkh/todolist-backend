const todo = require('./todo')
const app = require('express')()
const cors = require('cors')

app.use('/todo', todo)
app.use(cors())

app.listen(3000, () => {
    console.log('listen to the port 3000')
})