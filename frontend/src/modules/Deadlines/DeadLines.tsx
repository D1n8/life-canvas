import * as React from 'react';
import { useState } from 'react';
import './Deadlines.css'
import DeadlinesList from './components/DealinesList/DeadlinesList';
import CreateDeadlineModal from './components/CreateDeadlineModal/CreateDeadlineModal';
import ButtonAdd from '../../ui/ButtonAdd/ButtonAdd';

function Deadlines() {
    const [list, setList] = useState([
        { id: 1, title: 'Созвон по ПП', due_date: '10.12.2025' },
        { id: 2, title: 'Созвон 2 по ПП', due_date: '15.12.2025' },
        { id: 3, title: 'Созвон 3 по ПП', due_date: '18.12.2025' },
        { id: 4, title: 'Созвон 4 по ПП', due_date: '23.11.2025' },
        { id: 5, title: 'Созвон 5 по ПП', due_date: '25.11.2025' }
    ])

    const [isOpenModalCreate, setIsModalOpenCreate] = useState(false)

    const createDeadline = (title: string, due_date: string) => {
        setList([...list, { id: Date.now(), title: title, due_date: due_date }])
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