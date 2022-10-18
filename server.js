require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const student = require('./api/student')

mongoose.connect('mongodb+srv://Pegasusx10:pegasus123@cluster0.749smlf.mongodb.net/student-database?retryWrites=true&w=majority', { useUnifiedTopology: true, useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
// db.once('open', () => console.log('Connected to Database'))

app.use(express.json())

const studentsRouter = require('./routes/students')
app.use('/api/students', studentsRouter)
app.use('/api/student', studentsRouter)

app.listen(5000, () => console.log('Server Started'))
