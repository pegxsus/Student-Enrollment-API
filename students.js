const express = require('express')
const router = express.Router()
const student = require('../api/student')

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
router.get('/:id', async (req, res) => {
 const identity = await student.find({_id: req.params.id})
  res.json(identity)
})

// Creating one
router.post('/:id', async (req, res) => {
  const newStudent = new student({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    grade: req.body.grade,
    division: req.body.division
  })
  try {
    const freshstudent = await newStudent.save()
    res.status(201).json(freshstudent)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Updating One
router.patch('/:id', async (req, res) => {
  const identity = await student.find({_id: req.params.id})
  res.json(identity)
  
  if (req.body.name != null) {
    res.student.name = req.body.name
  }
  if (req.body.grade != null) {
    res.student.grade = req.body.grade
  }
  try {
    const updatedstudent = await res.student.save()
    res.json(updatedstudent)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Deleting One
router.delete('/:id', async (req, res) => {
  try {
    await student.find({_id: req.params.id})
    res.json({ message: 'Deleted student' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

async function getstudent(req, res, next) {
  let student
  try {
    student = await student.find({_id: req.params.id})
    if (student == null) {
      return res.status(404).json({ message: 'Cannot find student' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

  res.student = student
  next()
}

module.exports = router
