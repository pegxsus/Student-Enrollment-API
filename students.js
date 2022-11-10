const express = require('express')
const router = express.Router()
const student = require('../api/student')

// Getting all Pagination and Query
router.get('/', async (req, res) => {
  try {
    req.query.firstName
    req.query.lastName
    req.query.grade
    req.query.division
    const pageSize = req.query.pageSize 
    const pageNumber = req.query.pageNumber 
    const posts = await student.find(req.query)
      .limit(parseInt(pageSize))
      .skip(parseInt(pageNumber))
      res.status(200).send(posts)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})


// Getting a single student
router.get('/:id', async (req, res) => {
  try{
  const studentInfo = await student.findById(req.params.id)
  res.send(`The Required student details are:`)
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
      const studentId = await student.findByIdAndDelete(id)
      res.send(`Document of ${studentId.firstName} ${studentId.lastName} has been deleted`)
  }
  catch (error) {
      res.status(400).json({ message: error.message })
  }
})


// Query Params
router.get('/', paginatedResults(student), (req, res) => {
    res.json(res.paginatedResults)
  })
  
  function paginatedResults(model) {
    return async (req, res, next) => {
      const pageSize = parseInt(req.query.pageSize)
      const pageNumber = parseInt(req.query.pageNumber)
  
      const startIndex = (pageSize - 1) * limit
      const endIndex = pageSize * limit
  
      const results = {}
  
      if (endIndex < await model.countDocuments().exec()) {
        results.next = {
          pageSize: pageSize + 1,
          pageNumber: pageNumber
        }
      }
      
      if (startIndex > 0) {
        results.previous = {
          pageSize: page - 1,
          pageNumber: pageNumber
        }
      }
      try {
        results.results = await model.find().pageNumber(pageNumber).skip(startIndex).exec()
        res.paginatedResults = results
        next()
      } catch (e) {
        res.status(500).json({ message: e.message })
      }
    }
  }

module.exports = router
