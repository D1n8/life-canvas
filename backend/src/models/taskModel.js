const pool = require('../config/db');

/**
 * Получить задачу по id
 */
const getTaskById = async (id) => {
  const { rows } = await pool.query(
    'SELECT * FROM tasks WHERE id = $1',
    [id]
  );
  return rows[0];
};

/**
 * Фокус на сегодня
 */
const getFocusTasks = async () => {
  const { rows } = await pool.query(`
    SELECT *
    FROM tasks
    WHERE is_focus = true
    ORDER BY due_date NULLS LAST, id ASC
  `);
  return rows;
};


/**
 * Все задачи с дедлайном
 */
const getDeadlineTasks = async () => {
  const { rows } = await pool.query(`
    SELECT *
    FROM tasks
    WHERE due_date IS NOT NULL
      AND is_completed = false
    ORDER BY due_date ASC
  `);
  return rows;
};

/**
 * План на неделю (7 дней, сгруппировано по дням)
 */
const getWeekTasks = async () => {
  const { rows } = await pool.query(`
    SELECT *
    FROM tasks
    WHERE due_date >= CURRENT_DATE
      AND due_date < CURRENT_DATE + interval '7 days'
      AND is_completed = false
    ORDER BY due_date ASC
  `);

  const week = {};

  rows.forEach(task => {
    const day = task.due_date.toISOString().slice(0, 10);
    if (!week[day]) week[day] = [];
    week[day].push(task);
  });

  return week;
};


/**
 * Создание задачи
 */
const createTask = async (task) => {
  const {
    title,
    description,
    is_focus,
    due_date,
    parent_id,
    type
  } = task;

  const { rows } = await pool.query(`
    INSERT INTO tasks (title, description, is_focus, due_date, parent_id, type)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *
  `, [title, description, is_focus, due_date, parent_id, type]);

  return rows[0];
};

/**
 * Универсальное обновление задачи
 */
const updateTask = async (id, data) => {
  const fields = [];
  const values = [];
  let index = 1;

  for (const key in data) {
    fields.push(`${key} = $${index}`);
    values.push(data[key]);
    index++;
  }

  if (!fields.length) return getTaskById(id);

  const query = `
    UPDATE tasks
    SET ${fields.join(', ')}
    WHERE id = $${index}
    RETURNING *
  `;

  values.push(id);

  const { rows } = await pool.query(query, values);
  return rows[0];
};

/**
 * Завершить / вернуть задачу
 */
const toggleComplete = async (id, is_completed) => {
  const { rows } = await pool.query(`
    UPDATE tasks
    SET is_completed = $1
    WHERE id = $2
    RETURNING *
  `, [is_completed, id]);

  return rows[0];
};

/**
 * Удалить задачу
 */
const deleteTask = async (id) => {
  await pool.query(
    'DELETE FROM tasks WHERE id = $1',
    [id]
  );
};

module.exports = {
  getTaskById,
  createTask,
  updateTask,
  toggleComplete,
  deleteTask,
  getFocusTasks,
  getDeadlineTasks,
  getWeekTasks
};

