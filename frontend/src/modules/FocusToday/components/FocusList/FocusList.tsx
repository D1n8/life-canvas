import * as React from 'react';
import './FocusList.css'
import ButtonAdd from '../../../../ui/ButtonAdd/ButtonAdd';
import FocusItem from '../FocusItem/FocusItem';
import type { IFocusItem } from '../../types/models';



interface IFocusListProps {
    list: IFocusItem[],
    deleteTask: (id: number) => void,
    completeTask: (id: number) => void,
    openModal: () => void
}

function FocusList({ list, openModal, completeTask, deleteTask }: IFocusListProps) {
    return (
        <div className="focus-list">
            <div className="focus-list-top">
                <h2 className="focus-list-title">Фокус на <span className="blue">сегодня</span></h2>
                <ButtonAdd openModal={openModal}/>
            </div>

            <ul className='focus-list-container'>
                {list.map(item =>
                    <FocusItem completeTask={completeTask} deleteTask={deleteTask} item={item}/>
                )}
            </ul>
        </div>


    );
}

export default FocusList;