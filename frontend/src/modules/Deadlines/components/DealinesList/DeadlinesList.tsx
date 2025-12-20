import * as React from 'react';
import TextBox from '../../../../ui/TextBox/TextBox';
import './DeadlinesList.css'
import type { ITask } from '../../../../types/modules';

interface IDeadlinesListProps {
    list: ITask[]
}

function DeadlinesList({ list }: IDeadlinesListProps) {
    return (
        <ul className="deadlines-list">
            {list.map(item =>
                <TextBox key={item.id} className='deadlines-item'>
                    <span>{item.title}</span>
                    <span className='blue'>{item.dueDate}</span>
                </TextBox>)}
        </ul>
    );
}

export default DeadlinesList;