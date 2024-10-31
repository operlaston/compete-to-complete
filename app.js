require('dotenv').config()
const cors = require('cors')
const express = require('express')
const taskRouter = require('./controllers/tasks')
const userRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const groupRouter = require('./controllers/groups')
const clearRouter = require('./controllers/clear')
const middleware = require('./utils/middleware')
const mongoose = require('mongoose')
const app = express()

mongoose.set('strictQuery', false)
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('connected to mongodb')
  })
  .catch((error) => {
    console.error('failed to connect to mongodb', error)
  })

app.use(cors())
app.use(express.static('dist'))
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/tasks', taskRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)
app.use('/api/groups', groupRouter)
app.use('/api/clear', clearRouter)

app.use(middleware.unknownEndpoint)

module.exports = app