const mongoose = require('mongoose')

const coursesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  isElective: {
    type: Boolean,
    required: true
  },
  teacher: {
    type: String,
    required: true
  },
})

// Custom validation function to check for unique title
coursesSchema.path('title').validate(function(value) {
  return new Promise((resolve, reject) => {
    this.constructor.findOne({ title: value }, (err, course) => {
      if (err) reject(err)
      if (course) {
        if (this.id === courses.id) resolve(true)
        else reject(new Error('Title must be unique'))
      } else {
        resolve(true)
      }
    })
  })
}, 'Title must be unique')

module.exports = mongoose.model('courses', coursesSchema)
