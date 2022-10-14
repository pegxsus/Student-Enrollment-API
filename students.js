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
router.patch('/:id', async (req, res, next) => {
  const identity = await student.find({_id: req.params.id})
  // res.json(identity)  
  
  if (req.body.firstName != null) {
    res.student.firstName = req.body.firstName
  }
  if (req.body.lastName != null) {
    res.student.lastName = req.body.lastName
  }
  if (req.body.grade != null) {
    res.student.grade = req.body.grade
  }
  if (req.body.division != null) {
    res.student.division = req.body.division
  }
  try {
    const updatedstudent = await res.student.save()
    res.json(updatedstudent)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
  res.json(identity)
});

// try{
//   const id = req.params.id;
//   const firstName = req.body.firstName;
//   const lastName = req.body.lastName;
//   const grade = req.body.grade;
//   const division = req.body.division;
//   const options = {new: true};

//   const result =  await student.findByIdAndUpdate(id, firstName, lastName, grade, division, options);
//   res.send(result);
// } catch (error) {
//   console.log(error.message);
// }
// });

// Deleting One
router.delete('/:id', async (req, res, next) => {
  student.remove({_id:req.params.id})
  .then(result =>{
    res.status(200).json({
      message: 'Student ("firstName") Deleted from Database',
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
      return res.status(404).json({ message: 'Cannot find student' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

  res.student = student
  next()
}

module.exports = router
