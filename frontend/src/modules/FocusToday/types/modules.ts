export interface ICreateTask {
    title: string,
    description?: string,
    dueDate?: string,
    isFocus?: boolean,
    parentId?: number,
    type?: "task"
}
