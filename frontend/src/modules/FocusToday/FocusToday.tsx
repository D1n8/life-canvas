import { useState } from 'react';
import FocusList from './components/FocusList/FocusList';
import './FocusToday.css'
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import CreateTaskModal from './components/CreateTaskModal/CreateTaskModal';

ChartJS.register(ArcElement, Tooltip, Legend);

function FocusToday() {
    const [list, setList] = useState([
        { id: 1, title: 'Первое задание', isCompleted: false },
        { id: 2, title: 'Сделать виртуализацию 1 лабу', isCompleted: true },
        { id: 3, title: 'Android проект', isCompleted: true }])

    const [isOpenModalCreate, setIsModalOpenCreate] = useState(false)

    const createTask = (title: string) => {
        setList([...list, { id: Date.now(), title: title, isCompleted: false }])
    }

    const deleteTask = (id: number) => {
        const filteredList = list.filter(item => item.id !== id)
        setList(filteredList)
    }

    const completeTask = (id: number) => {
        const taskIndex = list.findIndex(item => item.id === id)
        const copyList = structuredClone(list)
        copyList[taskIndex].isCompleted = true;
        setList(copyList)
    }

    // diagramm   
    const totalTasks = list.length
    const totalCompletedTasks = list.filter(task => task.isCompleted).length

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
                completeTask={completeTask}
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