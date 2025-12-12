const taskModel = require('../models/taskModel');

const getDashboardData = async (req, res) => {
    try {
        const focus = await taskModel.getFocusTasks();
        const upcoming = await taskModel.getUpcomingTasks();
        
        res.json({
            focusWidget: focus,
            weeklyPlanWidget: upcoming
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

const createTask = async (req, res) => {
    try {
        const newTask = await taskModel.createTask(req.body);
        res.status(201).json(newTask);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Could not create task' });
    }
};

const toggleComplete = async (req, res) => {
    try {
        const { id } = req.params;
        const { is_completed } = req.body;
        const updated = await taskModel.updateTaskStatus(id, is_completed);
        res.json(updated);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Could not update task' });
    }
};

module.exports = {
    getDashboardData,
    createTask,
    toggleComplete
};