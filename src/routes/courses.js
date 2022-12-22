
const express = require('express')
const router = express.Router()
const courses = require('../models/courses')

// Getting all 
router.get('/', async (req, res) => {
  try {
    const students = await courses.find()
    res.json(students)
      } catch (err) {
        res.status(401).json(`The input enpoint URL is not valid!`)
      }
    })
    
// Getting a single course
router.get('/courses/:id', async (req, res) => {
  try{
  const coursesInfo = await courses.findById(req.params.id)
   res.send(coursesInfo)
  } catch (err) {
    res.status(401).json(`courses database not found!`)
  }
 }) 

// Creating one
router.post('/', async (req, res) => {
  const newCourses = new courses({
    title: req.body.title,
    isElective: req.body.isElective,
    teacher: req.body.teacher
  })
  try {
    const freshCourses = await newCourses.save()
    res.status(201).json(freshCourses)
  } catch (err) {
    res.status(401).json(`Courses database not found!`)
  }
})

// Updating One
router.put('/courses/:id', async (req, res, next) => {
  courses.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(){
    courses.findOne({_id: req.params.id}).then(function(courses){
    res.send(`Courses with ID ${courses._id} has been Updated.`)
  })
})
  .catch(err=>{
    res.status(401).json({error:'The input URL is incorrect!' })
  })
})

//Delete by ID Method
router.delete('/courses/:id', async (req, res, next) => {
  try {
      const coursesId = await courses.findByIdAndDelete(req.params.id)
      res.send(`The Course ${coursesId.title} has been deleted from the database`)
  }
  catch (error) {
      res.status(401).json(`Courses database not found!`)
  }
})

module.exports = router