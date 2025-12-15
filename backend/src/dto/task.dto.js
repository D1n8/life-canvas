// Mapper для Task
const mapTaskDto = (row) => ({
  id: row.id,
  title: row.title,
  description: row.description,
  isFocus: row.is_focus,
  isCompleted: row.is_completed,
  dueDate: row.due_date,       // ISO string
  parentId: row.parent_id,
  type: row.type,
  createdAt: row.created_at
});

// DTO для создания задачи
const CreateTaskDto = ({ title, description, dueDate, isFocus, parentId, type }) => ({
  title,
  description: description || null,
  dueDate: dueDate || null,
  isFocus: isFocus || false,
  parentId: parentId || null,
  type: type || 'task'
});

// DTO для обновления задачи
const UpdateTaskDto = ({ title, description, dueDate, isFocus, isCompleted, parentId, type }) => ({
  ...(title !== undefined && { title }),
  ...(description !== undefined && { description }),
  ...(dueDate !== undefined && { dueDate }),
  ...(isFocus !== undefined && { isFocus }),
  ...(isCompleted !== undefined && { isCompleted }),
  ...(parentId !== undefined && { parentId }),
  ...(type !== undefined && { type })
});

module.exports = {
  mapTaskDto,
  CreateTaskDto,
  UpdateTaskDto
};
