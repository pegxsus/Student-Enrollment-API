const express = require('express')
const router = express.Router()
const Subscriber = require('../models/subscriber')

router.get('/', async (req, res) => {
 try {
    const subscribers = await Subscriber.find()
 } catch (err) {
    res.status(500).json({message: err.message})
 }
})

router.get('/:id', (req,res) => {

})

router.get('/', (req,res) => {

})
module.exports = router 