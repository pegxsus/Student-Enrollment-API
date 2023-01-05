const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    validate(firstName){
      if(firstName < 0){
        throw new Error('First Name should not be an empty string!')
      }
    }
  },
  lastName: {
    type: String,
    required: true,
    validate(lastName){
      if(lastName < 0){
        throw new Error('First Name should not be an empty string!')
      }
    }
  },
  grade: {
    type: Number,
    required: true
  },
  division: {
    type: String,
    required: true
  },
  enrolledCourses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'courses'
  }]
}, {

  // This will prevent duplicate firstName and lastName from being entered into the database
  collection: 'students',
  id: false,
  unique: ['firstName', 'lastName']
});

// Custom validation for the 'enrolledCourses' field
studentSchema.path('enrolledCourses').validate(function(enrolledCourses) {
  // Ensure that a student can only enroll in up to 4 courses
  if (enrolledCourses.length > 4) {
    return res.status(400).send({ error: 'Cannot enroll in more than 4 courses' });
  }
  // Ensure that a student can only enroll in unique courses
  return enrolledCourses.length === new Set(enrolledCourses).size;
}, 'A student can only enroll in up to 4 unique courses');

module.exports = mongoose.model('student', studentSchema)
