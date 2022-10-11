const express = require('express')
const app = express()
const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true})
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', ()=> console.log('connected to Database'))

app.use(express.json())


const subscribersRouter = require('-/routes/subscribers')
app.use('/subcribers', subscriberRouter)

app.listen(5000, () => console.log('server started'))