const express = require('express')
const router = express.Router()
const student = require('../models/student')
const queryCondition = require('../utils/logic')
// const { getData, createData, updateData, deleteData } = require('../controller/students');


// Getting all Pagination and Query
router.get('/students', async (req, res, next) => {
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
router.get('/:id', async (req, res) => {
  try{
  const studentInfo = await student.findById(req.params.id).populate('enrolledCourses')
   res.send(studentInfo)
  } catch (err) {
    res.status(401).json(`Student database not found!`)
  }
}) 

// Creating one with array 
router.post('/students', async (req, res, next) => {
  const newStudent = new student({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    grade: req.body.grade,
    division: req.body.division,
    enrolledCourses: req.body.enrolledCourses
})

// Validate firstName & lastName to be unique
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  student.findOne({ firstName: firstName, lastName: lastName }, (err, student) => {
    if (err) {
      return;
    }
    if (student) {
      res.send({ error: 'The Student cannot be added since the student already exsists in the database' });
    } else {
      res.send({ success: 'The student details have been successfully added to the database'});
    }
});

// Validate enrolled courses to 4 
  const enrolledCourses = req.body.enrolledCourses;
  if (!Array.isArray(enrolledCourses)) {
    return res.status(400).send({ error: 'Enrolled courses must be an array' });
  }

  if (enrolledCourses.length > 4) {
    return res.status(400).send({ error: 'Cannot enroll in more than 4 courses' });
  }

  function isUnique(arr) {
    return new Set(arr).size === arr.length;
  }
  
  if (!isUnique(enrolledCourses)) {
    return res.status(400).send({ error: 'Enrolled courses must be unique' });
  }

// Unique Courses Field
// const { enrolledCourses } = req.body.enrolledCourses;



  try {
    const freshstudent = await newStudent.save()
    res.status(201).json(freshstudent)
    } catch (err) {
      next(err)
    }
})


// Updating One
router.put('/:id', async (req, res, next) => {
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
router.delete('/:id', async (req, res, next) => {
  try {
    const studentId = await student.findByIdAndDelete(req.params.id)
    res.send(`The student has been deleted has been successfully deleted!`)
  } catch (err) {
    next(err)
  }
})

module.exports = router
