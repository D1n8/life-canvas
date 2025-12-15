const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

/* ===== Получение списков ===== */
router.get('/focus', taskController.getFocusTasks);
router.get('/deadlines', taskController.getDeadlineTasks);
router.get('/week', taskController.getWeekTasks);

/* ===== CRUD ===== */
router.post('/', taskController.createTask);
router.patch('/:id', taskController.updateTask);
router.patch('/:id/complete', taskController.toggleComplete);
router.delete('/:id', taskController.deleteTask);

module.exports = router;
