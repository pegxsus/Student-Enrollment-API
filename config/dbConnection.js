const mongoose = require('mongoose')
const db = mongoose.connection
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

module.exports = {connection}