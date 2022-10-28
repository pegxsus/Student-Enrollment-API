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

// Getting a single student 
// router.get('/:id', async (req, res) => {
//   try {
//     const studentinfo = await student.findById({_id: req.params.id}, req.body)
//     res.send(`The student associated with the ID is ${studentinfo.firstName} ${studentinfo.lastName}`)
//   } catch (err) {
//     res.status(500).json({ message: err.message })
//   }
// })
router.get('/:id', async (req, res) => {
  try{
  const identity = await student.find({_id: req.params.id})
   res.json(identity)
  const studentInfo = await student.find({_id: req.params.id}, req.body)
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
router.get('/:key', async (req, res) => {
  const data = await student.find(
    {
        "$or":[
          {firstName:{$regex:req.params.key}},
          {lastName:{$regex:req.params.key}},
          {grade:{$regex:req.params.key}},
          {division:{$regex:req.params.key}},  
        ]
    }
)
res.send(data);

})

// Query Limit student Data
router.get('/', async (req, res) => {
  try{
    const userQuery =  req.query
    const filteredStudent = await student.limit(2)
        res.json({data: filteredStudent})
  }catch(err){
    res.send(err.message)
  }
})

module.exports = router
