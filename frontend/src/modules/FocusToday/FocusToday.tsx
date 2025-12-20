import { useEffect, useState } from 'react';
import FocusList from './components/FocusList/FocusList';
import './FocusToday.css'
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import CreateTaskModal from './components/CreateTaskModal/CreateTaskModal';
import { FocusService } from './API/FocusService';
import type { ITask } from '../../types/modules';
import type { ICreateTask } from './types/modules';

ChartJS.register(ArcElement, Tooltip, Legend);

function FocusToday() {
    const [list, setList] = useState<ITask[]>([])

    const [isOpenModalCreate, setIsModalOpenCreate] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            const focusList = await FocusService.getAllFocusItems()
            setList(focusList)
        }
        fetchData()
    }, [])

    // управление задачами
    const createTask = async (title: string, dueDate?: Date) => {
        const newTask: ICreateTask = {
            title: title,
            isFocus: true,
            dueDate: dueDate ? dueDate.toISOString() : undefined
        }
        const response = await FocusService.createTask(newTask)
        console.log(response)
        setList([...list, response])
    }

    const deleteTask = (id: number) => {
        const filteredList = list.filter(item => item.id !== id)
        setList(filteredList)
    }

    const setCompleteTask = async (id: number, isComplete: boolean) => {
        const updatedTask = await FocusService.completeTask(id, isComplete)
        setList(prev =>
            prev.map(task =>
                task.id === id ? updatedTask : task
            )
        )
    }

    // диаграмма  
    const totalTasks = list.length
    const totalCompletedTasks = list.filter(task => task.isCompleted === true).length

    const data = {
        datasets: [
            {
                data: [totalCompletedTasks, totalTasks - totalCompletedTasks],
                backgroundColor: ["#006EFF", 'black'],
                borderWidth: 0
            },
        ],
    };

    return (
        <div className='focus-today'>
            <FocusList
                list={list}
                setCompleteTask={setCompleteTask}
                deleteTask={deleteTask}
                openModal={() => setIsModalOpenCreate(true)} />
            <div className='focus-today-diagramm'>
                <div className="focus-today-diagramm-container">
                    <Pie data={data}></Pie>
                </div>
            </div>
            <CreateTaskModal createTask={createTask} isOpen={isOpenModalCreate} onClose={() => setIsModalOpenCreate(false)}></CreateTaskModal>
        </div>
    );
}

export default FocusToday;