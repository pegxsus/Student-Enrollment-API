
const express = require('express')
const router = express.Router()
const coursesController = require('../controllers/students');


router.get('/courses', coursesController.getCourses);
router.get('/courses/:id', coursesController.getCourses);
router.post('/courses', coursesController.postCourses);
router.put('/courses/:id', coursesController.updateCourses);
router.delete('/courses/:id', coursesController.deleteCourses);


module.exports = router
