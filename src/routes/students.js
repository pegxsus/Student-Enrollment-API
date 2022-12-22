const express = require('express')
const router = express.Router()
const student = require('../models/student')
const courses = require('../models/courses')
const queryCondition = require('../utils/logic')
const error = require('../controller/error_handler/error')

// Getting all Pagination and Query
router.get('/', async (req, res, next) => {
  try {
    const pageSize = parseInt(req.query.pageSize) || 0
    const pageNumber = parseInt(req.query.pageNumber) || 1 
    const queries = queryCondition(req.query)
    const students = await student
      .find(queries)
      .limit(pageSize)
      .skip(pageNumber - 1)
      .populate('enrolledCourses')
      res.status(200).send(students)
    } catch (err) {
      next(err)
    }
    })
    
// Getting a single student
router.get('/student/:id', async (req, res) => {
  try{
  const studentInfo = await student.findById(req.params.id)
   res.send(studentInfo)
  } catch (err) {
    res.status(401).json(`Student database not found!`)
  }
 }) 

// Creating one
router.post('/', async (req, res, next) => {
  const newStudent = new student({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    grade: req.body.grade,
    division: req.body.division,
    enrolledCourses: req.body.enrolledCourses
  })
  
  try {
    const freshstudent = await newStudent
    res.status(201).json(freshstudent)
    .save()
    } catch (e) {
      next(err)
    }
})

//   try {
//     const students = await newStudent.findById(req.params.id);
//     student.courses.push(req.body.id);
  
//     if (student.courses.length > 4) {
//       res.status(400).send({ error: 'A student can only enroll in up to 4 courses.' });
//       return;
//     }

//     await student.save();
//     res.send(students);
//   } catch (e) {
//     next(err)
//   }
// });

// Updating One
router.put('/student/:id', async (req, res, next) => {
  student.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(){
    student.findOne({_id: req.params.id}).then(function(student){
    res.send(`student with the ID ${student._id} has been Updated successfully.`)
  })
})
  .catch(err=>{
    handleError(err, res)
  })
})

//Delete by ID Method
router.delete('/student/:id', async (req, res, next) => {
  try {
    const studentId = await student.findByIdAndDelete(req.params.id)
    res.send(`Student with the name ${studentId.firstName} ${studentId.lastName} has been deleted`)
  } catch (e) {
    next(err)
  }
})

module.exports = router