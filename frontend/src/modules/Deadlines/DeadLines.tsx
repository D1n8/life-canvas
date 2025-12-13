import * as React from 'react';
import { useState } from 'react';
import TextBox from '../../ui/TextBox/TextBox';
import './Deadlines.css'

function Deadlines() {
    const [list, setList] = useState([
        {id: 1, title: 'Созвон по ПП', due_date: '10.12.2025'},
        {id: 2, title: 'Созвон 2 по ПП', due_date: '15.12.2025'},
        {id: 3, title: 'Созвон 3 по ПП', due_date: '18.12.2025'},
        {id: 4, title: 'Созвон 4 по ПП', due_date: '23.11.2025'},
        {id: 5, title: 'Созвон 5 по ПП', due_date: '25.11.2025'}
    ])

    return ( 
        <div className="deadlines">
            <h2 className='deadlines-title'>Ближайшие <span className='blue'>дедлайны</span></h2>
            <ul className="deadlines-list">
                { list.map(item => 
                <TextBox className='deadlines-item'>
                    <span>{item.title}</span>
                    <span className='blue'>{item.due_date}</span>
                </TextBox>)}
            </ul>
        </div>
     );
}

export default Deadlines;