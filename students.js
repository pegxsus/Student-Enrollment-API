const express = require('express')
const router = express.Router()
const student = require('../models/student')

// Getting all 
router.get('/', async (req, res) => {
  try {
    const students = await student.find()
    res.json(students)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Getting One
router.get('/:id', getstudent, (req, res) => {
  res.json(res.student)
})

// Creating one
router.post('/', async (req, res) => {
  const student = new student({
    name: req.body.name,
    lastname: req.body.lastname,
    grade: req.body.grade,
    division: req.body.division,
  })
  try {
    const newstudent = await student.save()
    res.status(201).json(newstudent)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Updating One
router.patch('/:id', getstudent, async (req, res) => {
  if (req.body.name != null) {
    res.student.name = req.body.name
  }
  if (req.body.subscribedToChannel != null) {
    res.student.subscribedToChannel = req.body.subscribedToChannel
  }
  try {
    const updatedstudent = await res.student.save()
    res.json(updatedstudent)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Deleting One
router.delete('/:id', getstudent, async (req, res) => {
  try {
    await res.student.remove()
    res.json({ message: 'Deleted student' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

async function getstudent(req, res, next) {
  let student
  try {
    student = await Subscriber.findById(req.params.id)
    if (subscriber == null) {
      return res.status(404).json({ message: 'Cannot find student' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

  res.student = student
  next()
}

module.exports = router
