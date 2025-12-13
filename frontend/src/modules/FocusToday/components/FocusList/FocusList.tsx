import * as React from 'react';
import './FocusList.css'
import TextBox from '../../../../ui/TextBox/TextBox';
import ButtonAdd from '../../../../ui/ButtonAdd/ButtonAdd';

type FocusItem = {
    id: number,
    title: string,
    isCompleted: boolean
}

interface IFocusListProps {
    list: FocusItem[]
}

function FocusList({ list }: IFocusListProps) {
    return (
        <div className="focus-list">
            <div className="focus-list-top">
                <h2 className="focus-list-title">Фокус на <span className="blue">сегодня</span></h2>
                <ButtonAdd />
            </div>

            <ul className='focus-list-container'>
                {list.map(item =>
                    <TextBox>{item.title}</TextBox>
                )}
            </ul>
        </div>


    );
}

export default FocusList;