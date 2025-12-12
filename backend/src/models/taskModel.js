const pool = require('../config/db');

// Получить задачи "Фокус дня"
const getFocusTasks = async () => {
    const query = 'SELECT * FROM tasks WHERE is_focus = true AND is_completed = false ORDER BY id ASC';
    const { rows } = await pool.query(query);
    return rows;
};

// Получить задачи с дедлайном на ближайшую неделю (План на неделю)
const getUpcomingTasks = async () => {
    // Берем задачи, которые не выполнены и дедлайн в течение 7 дней
    const query = `
        SELECT * FROM tasks 
        WHERE due_date >= CURRENT_DATE 
        AND due_date <= CURRENT_DATE + interval '7 days'
        AND is_completed = false
        ORDER BY due_date ASC
    `;
    const { rows } = await pool.query(query);
    return rows;
};

// Создать новую задачу
const createTask = async (task) => {
    const { title, description, is_focus, due_date, parent_id, type } = task;
    const query = `
        INSERT INTO tasks (title, description, is_focus, due_date, parent_id, type)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *
    `;
    const values = [title, description, is_focus || false, due_date, parent_id, type || 'task'];
    const { rows } = await pool.query(query, values);
    return rows[0];
};

// Обновить статус (например, выполнить задачу)
const updateTaskStatus = async (id, is_completed) => {
    const query = 'UPDATE tasks SET is_completed = $1 WHERE id = $2 RETURNING *';
    const { rows } = await pool.query(query, [is_completed, id]);
    return rows[0];
};

module.exports = {
    getFocusTasks,
    getUpcomingTasks,
    createTask,
    updateTaskStatus
};