const express = require('express')
const router = express.Router()
const student = require('../api/student')
const queryCondition = require('../utils/logic')

// Getting all Pagination and Query
router.get('/', async (req, res) => {
  try {
    const pageSize = parseInt(req.query.pageSize) || 0
    const pageNumber = parseInt(req.query.pageNumber) || 1
    let queryCondition = {}
    for (const [key, value] of Object.entries(req.query)) {
      if (['firstName', 'lastName', 'grade', 'division'].includes(key)) {
        queryCondition[key] = value
      }
    }
    const queries = queryCondition
    const posts = await student
      .find(queries)
      .limit(pageSize)
      .skip(pageNumber - 1)
      res.status(200).send(posts)
      } catch (err) {
        res.status(500).json({ message: err.message })
      }
    })
    
// Getting a single student
router.get('/:id', async (req, res) => {
  try{
  const studentInfo = await student.findById(req.params.id)
   res.send(studentInfo)
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
    res.send(`student with ID ${student._id} has been Updated.`)
  })
})
  .catch(err=>{
    res.status(500).json({error:err })
  })
})

//Delete by ID Method
router.delete('/:id', async (req, res, next) => {
  try {
      const studentId = await student.findByIdAndDelete(req.params.id)
      res.send(`Student with the name ${studentId.firstName} ${studentId.lastName} has been deleted`)
  }
  catch (error) {
      res.status(400).json({ message: error.message })
  }
})



module.exports = router