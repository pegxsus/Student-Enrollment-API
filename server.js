require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const studentRouter = require('./routes/students')
const db = mongoose.connection
const port = 5000
const dotenv = require("dotenv")
const uri = process.env.MONGODB_CONNECTION_STRING
dotenv.config()

mongoose.connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true, 
})

const connection = mongoose.connection;
connection.once("open", () => {
    console.log("MongoDB database connection established successfully.")
})


db.on('error', (error) => console.error(error))

app.use(express.json())

app.use('/api/students', studentRouter)
app.use('/api/student', studentRouter)

app.listen(port, () => console.log('Server Started'))
