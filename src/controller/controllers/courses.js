const courses = require('../models/courses')

exports.getCourses = async (req, res) => {
    try {
            const students = await courses.find()
            res.json(students)
              } catch (err) {
                res.status(404).json('The input URL is incorrect!')
              }
            }

exports.getCourses = async (req, res) => {
    try{
          const coursesInfo = await courses.findById(req.params.id)
           res.send(coursesInfo)
          } catch (err) {
            res.status(404).json(`courses not found!`)
          }
         }

exports.postCourses = async (req, res) => {
    const newCourses = new courses({
            title: req.body.title,
            isElective: req.body.isElective,
            teacher: req.body.teacher
          })
          //  Unique Courses Field
          const title = req.body.title;
          function isUnique(arr){
            return new set(arr).size === arr.length;
          }
          if (!isUnique(title)) {
            return res.status(400).send({ error: 'Entered course should be unique'})
          }
          try {
            const freshCourses = await newCourses.save()
            res.status(201).json(freshCourses)
          } catch (err) {
            res.status(404).json(`Courses database not found!`)
          }
        }

exports.updateCourses = async (req, res) => {
    courses.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(){
    courses.findOne({_id: req.params.id}).then(function(courses){
    res.send(`Courses with ID ${courses._id} has been Updated.`)
  })
})
  .catch(err=>{
    res.status(401).json({error:'The input URL is incorrect!' })
  })
}

exports.deleteCourses = async (req, res) => {
      try {
      const coursesId = await courses.findByIdAndDelete(req.params.id)
      res.send(`The Course ${coursesId.title} has been deleted from the database`)
  }
  catch (error) {
      res.status(404).json(`Courses database not found!`)
  }
}