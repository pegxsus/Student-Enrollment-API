require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const studentRouter = require('./routes/students')
const coursesRouter = require('./routes/courses')
const connection = require('./config/dbConnection')
const db = mongoose.connection
const PORT = 5000
const dotenv = require("dotenv")


dotenv.config()

db.on('error', (error) => console.error(error))

app.use(express.json())

app.use('/api/students', studentRouter)
app.use('/api', studentRouter)
app.use('/', studentRouter)
app.use ('/', coursesRouter)
app.use('/api/courses', coursesRouter)
app.use('/api', coursesRouter)


app.listen(PORT, () => console.log('Server Started'))