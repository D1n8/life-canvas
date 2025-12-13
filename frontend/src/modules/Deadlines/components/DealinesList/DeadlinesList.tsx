import * as React from 'react';
import TextBox from '../../../../ui/TextBox/TextBox';
import './DeadlinesList.css'

type DeadlinesItem = {
    id: number,
    title: string,
    due_date: string
}
interface IDeadlinesListProps {
    list: DeadlinesItem[]
}

function DeadlinesList({ list }: IDeadlinesListProps) {
    return (
        <ul className="deadlines-list">
            {list.map(item =>
                <TextBox className='deadlines-item'>
                    <span>{item.title}</span>
                    <span className='blue'>{item.due_date}</span>
                </TextBox>)}
        </ul>
    );
}

export default DeadlinesList;