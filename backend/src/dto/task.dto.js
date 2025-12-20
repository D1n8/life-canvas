const mapTaskDto = (row) => ({
  id: row.id,
  title: row.title,
  description: row.description,
  isFocus: row.is_focus,
  isCompleted: row.is_completed,
  dueDate: row.due_date,
  parentId: row.parent_id,
  type: row.type,
  createdAt: row.created_at
});

const CreateTaskDto = ({ title, description, dueDate, isFocus, parentId, type }) => ({
  title,
  description: description ?? null,
  is_focus: isFocus === true,
  due_date: dueDate ?? null,
  parent_id: parentId ?? null,
  type: type ?? 'task'
});

const UpdateTaskDto = ({ title, description, dueDate, isFocus, isCompleted, parentId, type }) => ({
  ...(title !== undefined && { title }),
  ...(description !== undefined && { description }),
  ...(dueDate !== undefined && { due_date: dueDate }),
  ...(isFocus !== undefined && { is_focus: isFocus }),
  ...(isCompleted !== undefined && { is_completed: isCompleted }),
  ...(parentId !== undefined && { parent_id: parentId }),
  ...(type !== undefined && { type })
});


module.exports = {
  mapTaskDto,
  CreateTaskDto,
  UpdateTaskDto
};
