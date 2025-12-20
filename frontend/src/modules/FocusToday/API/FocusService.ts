import axios from "axios";
import type { ITask } from "../../../types/modules";
import type { ICreateTask } from "../types/modules";

export class FocusService {
    static readonly API = import.meta.env.VITE_API_URL
    static async getAllFocusItems(): Promise<ITask[]> {
        try {
            
            const response = await axios.get(`${this.API}/tasks/focus`)
            return response.data
        } catch (e) {
            console.error(e)
            return []
        }
    }

    static async completeTask(id: number, isCompleted: boolean) {
        try {
            const response = await axios.patch(`${this.API}/tasks/${id}/complete`,
                {
                    isCompleted
                }
            )
            return response.data
        } catch (error) {
            console.log(error)
        }
    }

    static async createTask({ title, description = '', dueDate, isFocus = false, parentId, type = 'task'}: ICreateTask) {
        try {
            const response = await axios.post(`${this.API}/tasks/`,
                {
                    title: title,
                    description: description,
                    isFocus: isFocus,
                    dueDate: dueDate,
                    parentId: parentId,
                    type: type
                }
            )
            return response.data
        } catch (error) {
            console.log(error)
        }
    }

    static async deleteTask(id: number){
        try {
            const response = await axios.delete(`${this.API}/tasks/${id}`)
            return response.data
        } catch (error) {
            console.log(error)
        }
    }
}