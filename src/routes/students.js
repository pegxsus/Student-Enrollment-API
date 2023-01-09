const express = require('express')
const router = express.Router()
const studentController = require('../controllers/students');


router.get('/students', studentController.getStudents);
router.get('/students/:id', studentController.getStudent);
router.post('/students', studentController.postStudent);
router.put('/students/:id', studentController.updateStudent);
router.delete('/students/:id', studentController.deleteStudent);


module.exports = router
