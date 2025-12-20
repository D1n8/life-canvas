import * as React from 'react';
import { useState } from 'react';
import './Deadlines.css'
import DeadlinesList from './components/DealinesList/DeadlinesList';
import CreateDeadlineModal from './components/CreateDeadlineModal/CreateDeadlineModal';
import ButtonAdd from '../../ui/ButtonAdd/ButtonAdd';
import type { ITask } from '../../types/modules';

function Deadlines() {
    const [list, setList] = useState<ITask[]>([
        {
            id: 1, title: 'Созвон по ПП', dueDate: '10.12.2025',
            isFocus: false,
            isCompleted: false,
            type: '',
            createdAt: ''
        },
        {
            id: 2, title: 'Созвон 2 по ПП', dueDate: '15.12.2025',
            isFocus: false,
            isCompleted: false,
            type: '',
            createdAt: ''
        },
        {
            id: 3, title: 'Созвон 3 по ПП', dueDate: '18.12.2025',
            isFocus: false,
            isCompleted: false,
            type: '',
            createdAt: ''
        },
        {
            id: 4, title: 'Созвон 4 по ПП', dueDate: '23.11.2025',
            isFocus: false,
            isCompleted: false,
            type: '',
            createdAt: ''
        },
        {
            id: 5, title: 'Созвон 5 по ПП', dueDate: '25.11.2025',
            isFocus: false,
            isCompleted: false,
            type: '',
            createdAt: ''
        }
    ])

    const [isOpenModalCreate, setIsModalOpenCreate] = useState(false)

    const createDeadline = (title: string, dueDate: string) => {
        setList([...list, {
            id: Date.now(), title: title, dueDate: dueDate,
            isFocus: false,
            isCompleted: false,
            type: '',
            createdAt: ''
        }])
    }

    return (
        <div className="deadlines">
            <div className="deadlines-top">
                <h2 className='deadlines-title'>Ближайшие <span className='blue'>дедлайны</span></h2>
                <ButtonAdd openModal={() => setIsModalOpenCreate(true)}></ButtonAdd>
            </div>

            <DeadlinesList list={list} />
            
            <CreateDeadlineModal
                isOpen={isOpenModalCreate}
                onClose={() => setIsModalOpenCreate(false)}
                createDeadline={createDeadline}></CreateDeadlineModal>
        </div>
    );
}

export default Deadlines;