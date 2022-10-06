const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  grade: {
    type: String,
    required: true
  },
  division: {
    type: String,
    required: true
  },
})

module.exports = mongoose.model('student', studentSchema)
