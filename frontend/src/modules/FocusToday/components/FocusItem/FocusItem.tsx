import * as React from 'react';
import TextBox from '../../../../ui/TextBox/TextBox';
import type { IFocusItem } from '../../types/models';
import MoreVert from '../../../../ui/MoreVert/MoreVert';
import './FocusItem.css'
import { useRef, useState } from 'react';
import Menu from '../../../../ui/Menu/Menu';

interface IFocusItemProps {
    item: IFocusItem,
    completeTask: (id: number) => void,
    deleteTask: (id: number) => void
}

function FocusItem({item, completeTask, deleteTask}: IFocusItemProps) {
    const [isOpenMenu, setIsOpenMenu] = useState(false)
    const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 })
    const moreRef = useRef<SVGSVGElement>(null)

    const handleOpen = () => {
        if (moreRef.current) {
            const rect = moreRef.current.getBoundingClientRect();
            setMenuPosition({ top: rect.bottom, left: rect.left });
            setIsOpenMenu(true);
        }
    };

    const handleDeleteTask = (id: number) => {
        deleteTask(id)
        setIsOpenMenu(false)
    }

    return (
        <TextBox className={`focus-item${item.isCompleted ? ' isCompleted' : ''}`}>
            <span className='focus-item-text'>{item.title}</span>
            <MoreVert ref={moreRef} setOpen={() => { handleOpen() }} />
            <Menu 
                style={{ top: menuPosition.top - 42, left: menuPosition.left + 40 }} 
                className='focus-item-more-menu' 
                isOpen={isOpenMenu} 
                onClose={() => setIsOpenMenu(false)}>
                    <div className="menu-container">
                        <button 
                            className="menu-btn"
                            onClick={() => completeTask(item.id)}
                            >Завершить</button>
                        <button className='menu-btn'>Подробнее</button>
                        <button 
                            className='menu-btn'
                            onClick={() => handleDeleteTask(item.id)}
                            >Удалить</button>
                    </div>
            </Menu>
        </TextBox>
    );
}

export default FocusItem;