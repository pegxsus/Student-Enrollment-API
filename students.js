const { response } = require('express')
const express = require('express')
const router = express.Router()
const student = require('../api/student')
// const data = require('./api/student')

// Getting all 
router.get('/', async (req, res) => {
  try {
    const students = await student.find()
    res.json(students)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Getting a single student 
router.get('/:id', async (req, res) => {
  try {
    const studentinfo = await student.find({_id: req.params.id})
    res.send(`The student associated with the ID is ${studentinfo.firstName}`)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})


// Creating one
router.post('/', async (req, res) => {
  const newStudent = new student({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
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
router.put('/:id', async (req, res, next) => {
  student.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(){
    student.findOne({_id: req.params.id}).then(function(student){
    res.send(`Document of ${student.firstName} has been Updated`)
  })
})
  .catch(err=>{
    res.status(500).json({error:err })
  })
})

//Delete by ID Method
router.delete('/:id', async (req, res, next) => {
  try {
      const id = await student.find({_id: req.params.id})
      const studentid = await student.findByIdAndDelete(id)
      res.send(`Document with ${studentid.firstName} has been deleted`)
  }
  catch (error) {
      res.status(400).json({ message: error.message })
  }
})

async function getstudent(req, res, next) {

  try {
    student = await student.find({_id: req.params.id})
    if (student == null) {
      return res.status(404).json({ message: 'Cannot find student from Database' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

  res.student = student
  next()
}

module.exports = router
