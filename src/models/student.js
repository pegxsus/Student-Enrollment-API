const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: async function(firstName) {
        const student = await this.model('students').findOne({ firstName });
        return !student;
      },
      message: 'Student with this first name already exists'
    }
  },
  lastName: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: async function(lastName) {
        const student = await this.model('students').findOne({ lastName });
        return !student;
      },
      message: 'Student with this last name already exists'
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
  enrolledCourses: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'courses',
    validate: {
      validator: function(enrolledCourses) {
        return enrolledCourses.length <= 4 && new Set(enrolledCourses).size === enrolledCourses.length;
      },
      message: 'Enrolled courses should not contain more than 4 unique IDs'
    }
  }
});

module.exports = mongoose.model('students', studentSchema);


