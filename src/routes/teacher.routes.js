const express = require('express');
const router = express.Router();
const teacherController = require('../controllers/teacher.controller');

router.get('/', teacherController.getAllTeachers);

router.get('/:id', teacherController.getTeacherById);
router.delete('/:id', teacherController.deleteTeacher);


router.post('/', teacherController.createTeacher);
router.put('/:id', teacherController.updateTeacher);





module.exports = router;
