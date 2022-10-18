require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const student = require('./api/student')
const studentRouter = require('./routes/students')
const db = mongoose.connection
const port = 5000

mongoose.connect('mongodb+srv://Pegasusx10:pegasus123@cluster0.749smlf.mongodb.net/student-database?retryWrites=true&w=majority', { useUnifiedTopology: true, useNewUrlParser: true })

db.on('error', (error) => console.error(error))

app.use(express.json())

app.use('/api/students', studentRouter)
app.use('/api/student', studentRouter)

app.listen(port, () => console.log('Server Started'))
