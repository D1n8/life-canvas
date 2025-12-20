const taskModel = require('../models/taskModel');
const { mapTaskDto, CreateTaskDto, UpdateTaskDto } = require('../dto/task.dto');

/**
 * Создать задачу
 */
exports.createTask = async (req, res) => {
  try {
    if (!req.body.title) {
      return res.status(400).json({ error: 'Title обязателен' });
    }

    let taskData;
    try {
      taskData = CreateTaskDto(req.body); // DTO для валидации
    } catch (dtoErr) {
      console.error('CreateTaskDto error:', dtoErr);
      return res.status(400).json({ error: 'Некорректные данные для создания задачи' });
    }

    let task;
    try {
      task = await taskModel.createTask(taskData);
    } catch (dbErr) {
      console.error('DB error on createTask:', dbErr);
      return res.status(500).json({ error: 'Ошибка базы данных при создании задачи' });
    }

    res.status(201).json(mapTaskDto(task));
  } catch (e) {
    console.error('Unexpected error in createTask:', e);
    res.status(500).json({ error: 'Неожиданная ошибка при создании задачи' });
  }
};

/**
 * Фокус на сегодня
 */
exports.getFocusTasks = async (req, res) => {
  try {
    const tasks = await taskModel.getFocusTasks();
    res.json(tasks.map(mapTaskDto));
  } catch (e) {
    console.error('getFocusTasks error:', e);
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
    console.error('getDeadlineTasks error:', e);
    res.status(500).json({ error: 'Ошибка получения дедлайнов' });
  }
};

/**
 * План на неделю
 */
exports.getWeekTasks = async (req, res) => {
  try {
    const week = await taskModel.getWeekTasks();
    const mappedWeek = {};
    for (const day in week) {
      mappedWeek[day] = week[day].map(mapTaskDto);
    }
    res.json(mappedWeek);
  } catch (e) {
    console.error('getWeekTasks error:', e);
    res.status(500).json({ error: 'Ошибка получения плана на неделю' });
  }
};

/**
 * Обновить задачу (универсально)
 */
exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: 'Не указан id задачи' });

    let updateData;
    try {
      updateData = UpdateTaskDto(req.body); // DTO для валидации
    } catch (dtoErr) {
      console.error('UpdateTaskDto error:', dtoErr);
      return res.status(400).json({ error: 'Некорректные данные для обновления' });
    }

    const task = await taskModel.updateTask(id, updateData);
    if (!task) return res.status(404).json({ error: 'Задача не найдена' });

    res.json(mapTaskDto(task));
  } catch (e) {
    console.error('updateTask error:', e);
    res.status(500).json({ error: 'Ошибка обновления задачи' });
  }
};

/**
 * Завершить / вернуть
 */
exports.toggleComplete = async (req, res) => {
  try {
    const { id } = req.params;
    const { isCompleted } = req.body;

    if (typeof isCompleted !== 'boolean') {
      return res.status(400).json({ error: 'isCompleted должно быть boolean' });
    }

    const task = await taskModel.toggleComplete(id, isCompleted);
    if (!task) return res.status(404).json({ error: 'Задача не найдена' });

    res.json(mapTaskDto(task));
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Ошибка изменения статуса задачи' });
  }
};


/**
 * Удалить
 */
exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: 'Не указан id задачи' });

    try {
      await taskModel.deleteTask(id);
    } catch (dbErr) {
      console.error('DB error on deleteTask:', dbErr);
      return res.status(500).json({ error: 'Ошибка базы данных при удалении задачи' });
    }

    res.status(204).end();
  } catch (e) {
    console.error('deleteTask error:', e);
    res.status(500).json({ error: 'Ошибка удаления задачи' });
  }
};
