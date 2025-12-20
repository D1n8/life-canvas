import * as React from 'react';
import './FocusList.css'
import ButtonAdd from '../../../../ui/ButtonAdd/ButtonAdd';
import FocusItem from '../FocusItem/FocusItem';
import type { ITask } from '../../../../types/modules';



interface IFocusListProps {
    list: ITask[],
    deleteTask: (id: number) => void,
    setCompleteTask: (id: number, isComplete: boolean) => void
    openModal: () => void
}

function FocusList({ list, openModal, setCompleteTask, deleteTask }: IFocusListProps) {
    return (
        <div className="focus-list">
            <div className="focus-list-top">
                <h2 className="focus-list-title">Фокус на <span className="blue">сегодня</span></h2>
                <ButtonAdd openModal={openModal}/>
            </div>

            <ul className='focus-list-container'>
                {list.map(item =>
                    <FocusItem setCompleteTask={setCompleteTask} deleteTask={deleteTask} item={item}/>
                )}
            </ul>
        </div>


    );
}

export default FocusList;