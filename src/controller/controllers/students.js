const student = require('../models/student')
const queryCondition = require('../utils/logic')

//getting all Students
exports.getStudents = async (req, res) => {
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
        }

//get one student 
exports.getStudent = async (req, res) => {
    try{
          const studentInfo = await student.findById(req.params.id).populate('enrolledCourses')
           res.send(studentInfo)
          } catch (err) {
            res.status(404).json(`Student you're looking for does not exist!`)
          }
        }

// post one student
exports.postStudent = async (req, res) => {
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
              res.send({ error: 'The Student cannot be added since the student already exsist in the database' });
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
        
        // Unique Courses Field
          function isUnique(arr) {
            return new Set(arr).size === arr.length;
          }
          
          if (!isUnique(enrolledCourses)) {
            return res.status(400).send({ error: 'Enrolled courses must be unique' });
          }
        
          try {
            const freshstudent = await newStudent.save()
            res.status(201).json(freshstudent)
            } catch (err) {
              res.status(404).json(`Student you're looking for does not exist!`)
            }
        }

// Updating one student
exports.updateStudent = async (req, res) => {
  try{
  const updatedRecord = student(req.params.id, req.body);
  res.send(updatedRecord);
    } catch (err) {
  res.status(500).send( `An error occurred while updating the record` )
    }
}

// Deleting one student
exports.deleteStudent = async (req, res) => {
    try {
            const studentId = await student.findByIdAndDelete(req.params.id)
            res.send(`The student has been deleted has been successfully deleted!`)
          } catch (err) {
            res.status(404).json(`Student you're looking for does not exist!`)
          }
        }