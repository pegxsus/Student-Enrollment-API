require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const studentRouter = require('./src/routes/students')
const coursesRouter = require('./src/routes/courses')
const connection = require('./src/config/dbConnection')
const db = mongoose.connection
const PORT = 5000
const dotenv = require("dotenv")

dotenv.config()

db.on('error', (error) => console.error(error))

app.use(express.json())
app.use('/api', coursesRouter)
app.use('/api', studentRouter)

app.use('*', (req,res) => {
    const err = new Error(`Requested URL is Invalid!`)
    res.status(404).json({        
        message: err.message       
    })
})

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500
    res.status(statusCode).json({        
        message: err.message
    })
})

app.listen(PORT, () => console.log('Server Started'))
