const taskModel = require('../models/taskModel');
const { mapTaskDto, CreateTaskDto, UpdateTaskDto } = require('../dto/task.dto');

/**
 * Создать задачу
 */
exports.createTask = async (req, res) => {
  try {
    const taskData = CreateTaskDto(req.body); // Используем DTO для создания
    const task = await taskModel.createTask(taskData);
    res.status(201).json(mapTaskDto(task)); // Возвращаем DTO для фронта
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Ошибка создания задачи' });
  }
};

/**
 * Фокус на сегодня
 */
exports.getFocusTasks = async (req, res) => {
  try {
    const tasks = await taskModel.getFocusTasks();
    res.json(tasks.map(mapTaskDto)); // Приведение к API shape
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Ошибка получения фокуса' });
  }
};

/**
 * Задачи с дедлайном
 */
exports.getDeadlineTasks = async (req, res) => {
  try {
    const tasks = await taskModel.getDeadlineTasks();
    res.json(tasks.map(mapTaskDto));
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Ошибка получения дедлайнов' });
  }
};

/**
 * План на неделю
 */
exports.getWeekTasks = async (req, res) => {
  try {
    const week = await taskModel.getWeekTasks();
    // week = { "2025-06-15": [task, task], ... }
    const mappedWeek = {};
    for (const day in week) {
      mappedWeek[day] = week[day].map(mapTaskDto);
    }
    res.json(mappedWeek);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Ошибка получения плана на неделю' });
  }
};

/**
 * Обновить задачу (универсально)
 */
exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = UpdateTaskDto(req.body); // Используем DTO
    const task = await taskModel.updateTask(id, updateData);
    res.json(mapTaskDto(task));
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Ошибка обновления задачи' });
  }
};

/**
 * Завершить / вернуть
 */
exports.toggleComplete = async (req, res) => {
  try {
    const { id } = req.params;
    const { is_completed } = req.body;
    const task = await taskModel.toggleComplete(id, is_completed);
    res.json(mapTaskDto(task));
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Ошибка изменения статуса' });
  }
};

/**
 * Удалить
 */
exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    await taskModel.deleteTask(id);
    res.status(204).end();
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Ошибка удаления задачи' });
  }
};
