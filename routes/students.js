const express = require('express')
const router = express.Router()
const student = require('../api/student')
const queryCondition = require('../utils/logic')

// Getting all Pagination and Query
router.get('/', async (req, res) => {
  try {
    const pageSize = parseInt(req.query.pageSize) || 0
    const pageNumber = parseInt(req.query.pageNumber) || 1 
    const queries = queryCondition(req.query)
    const students = await student
      .find(queries)
      .limit(pageSize)
      .skip(pageNumber - 1)
      res.status(200).send(students)
      } catch (err) {
        res.status(400).json(`The input enpoint URL is not valid!`)
      }
    })
    
// Getting a single student
router.get('/student/:id', async (req, res) => {
  try{
  const studentInfo = await student.findById(req.params.id).populate('course')
   res.send(studentInfo)
  } catch (err) {
    res.status(401).json(`Student database not found!`)
  }
 }) 

// Creating one
router.post('/', async (req, res) => {
  const newStudent = new student({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    grade: req.body.grade,
    division: req.body.division,
   enrolledCourses: req.body.enrolledCourses
  })
  try {
    const freshstudent = await newStudent.save()
    res.status(201).json(freshstudent)
  } catch (err) {
    res.status(401).json(`Student Database not found!`)
  }
})

// Updating One
router.put('/student/:id', async (req, res, next) => {
  student.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(){
    student.findOne({_id: req.params.id}).then(function(student){
    res.send(`student with ID ${student._id} has been Updated.`)
  })
})
  .catch(err=>{
    res.status(401).json({error:'The input URL is incorrect!' })
  })
})

//Delete by ID Method
router.delete('/student/:id', async (req, res, next) => {
  try {
      const studentId = await student.findByIdAndDelete(req.params.id)
      res.send(`Student with the name ${studentId.firstName} ${studentId.lastName} has been deleted`)
  }
  catch (error) {
      res.status(401).json(`Student database not found!`)
  }
})

// Error Catch
// router.get('/student', async (req, res) => {
//   res.status(401).json('Invalid URL endpoint!')
//   })

// router.get('/students', async (req, res) => {
//     res.status(401).json('Invalid URL endpoint!')
    
//   })

// router.get('/:id', async (req, res) => {
//     res.status(401).json('Invalid URL endpoint!')
    
//   })


module.exports = router