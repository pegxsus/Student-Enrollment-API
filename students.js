const { response } = require('express')
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

//Delete by ID Method
router.delete('/:id', async (req, res, next) => {
  try {
      const id = await student.find({_id: req.params.id})
      const studentid = await student.findByIdAndDelete(id)
      res.send(`Document with ${studentid.firstName} has been deleted..`)
  }
  catch (error) {
      res.status(400).json({ message: error.message })
  }
})

async function studentname(req, res, next) {

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
// router.get('/student', function (req, res) {
//   console.log("Name: ", req.query.firstname);
//   console.log("Last Name:", req.query.lastName);
//   console.log("grade:", req.query.grade);
//   console.log("division", req.query.division);
//   res.json();
// });
// router.get('/', function(req,res){
//   // var queryParameter = req.query;
//   let firstName = request.query.firstName
//   if(student[firstName]){
//     response.json(student.fetch[firstName])
//   }else{
//     response.json('Student not found')
//   }
//   })
//   console(queryParameter.firstName);
//   console(queryParameter.lastName);
//   console(queryParameter.grade);
//   console(queryParameter.division);

//   res.json(queryParameter);
// });


// Query Parameter
const fetchData = () => {
  router.get(`localhost:5000/api/student/?firstName=${firstName}`).then((res) => {
    student(res.query.firstName)
    res.json(fetchData)
    res.send(req.query)
  })
}
module.exports = router
