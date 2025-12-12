const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

router.get('/dashboard', taskController.getDashboardData);
router.post('/', taskController.createTask);
router.patch('/:id/status', taskController.toggleComplete);

module.exports = router;