const express = require("express")
const cors = require('cors')
require('dotenv').config()
require('./db/db')

const app = express()

app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 5000


const userRouter = require('./routers/user')
app.use('/api/v1', userRouter)

const boardRouter = require('./routers/board')
app.use('/api/v1', boardRouter)

const panelRouter = require("./routers/panel")
app.use('/api/v1', panelRouter)

const cardRouter = require('./routers/card')
app.use('/api/v1', cardRouter)


// listen app on port
app.listen(PORT, () => console.log(`server upon port ${PORT}`))