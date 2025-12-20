export interface ITask {
    id: number,
    title: string,
    description?: string,
    isFocus: boolean,
    isCompleted: boolean,
    dueDate?: string,
    parentId?: number,
    type: string,
    createdAt: string
}