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
 const studentinfo = await student.find({_id: req.params.id})
  res.json(studentinfo)
  res.send(req.query)
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
    res.send(student)
  })
})
  .catch(err=>{
    res.status(500).json({
      error:err
    })
  })
})

  
// Deleting One
router.delete('/:id', async (req, res, next) => {
var studentname = req.params.firstName
  student.remove({_id:req.params.id})
  .then(result =>{
    res.status(200).json({
      message: `Student ${studentname} deleted from Database`,
    })
  })
  .catch(err=>{
    res.status(500).json({
      error:err
    })
  })
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

// Query Parameters
router.get('/', function(req,res){
  var queryParameter = req.query;
  console(queryParameter.firstName);
  console(queryParameter.lastName);
  console(queryParameter.grade);
  console(queryParameter.division);

  res.json(queryParameter);
});

module.exports = router
