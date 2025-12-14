import * as React from 'react';
import TextBox from '../../../../ui/TextBox/TextBox';
import type { IFocusItem } from '../../types/models';
import MoreVert from '../../../../ui/MoreVert/MoreVert';
import './FocusItem.css'
import { useRef, useState } from 'react';
import Menu from '../../../../ui/Menu/Menu';
import DeletingConfirmModal from '../../../../components/DeletingConfirmModal/DeletingConfirmModal';

interface IFocusItemProps {
    item: IFocusItem,
    setCompleteTask: (id: number, isComplete: boolean) => void,
    deleteTask: (id: number) => void
}

function FocusItem({ item, setCompleteTask, deleteTask }: IFocusItemProps) {
    const [isOpenMenu, setIsOpenMenu] = useState(false)
    const [isOpenDelConfirm, setIsOpenDelConfirm] = useState(false)
    const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 })
    const moreRef = useRef<SVGSVGElement>(null)

    const handleOpen = () => {
        if (moreRef.current) {
            const rect = moreRef.current.getBoundingClientRect();
            setMenuPosition({ top: rect.bottom, left: rect.left });
            setIsOpenMenu(true);
        }
    };

    const tryDeleteTask = () => {
        setIsOpenMenu(false)
        setIsOpenDelConfirm(true)
    }

    const handleDeleteTask = (id: number) => {
        deleteTask(id)
        setIsOpenDelConfirm(false)
    }

    return (
        <>
            <TextBox className={`focus-item${item.isCompleted ? ' isCompleted' : ''}`}>
                <span className='focus-item-text'>{item.title}</span>
                <MoreVert ref={moreRef} setOpen={() => { handleOpen() }} />
                <Menu
                    style={{ top: menuPosition.top - 42, left: menuPosition.left + 40 }}
                    className='focus-item-more-menu'
                    isOpen={isOpenMenu}
                    onClose={() => setIsOpenMenu(false)}>
                    <div className="menu-container">
                        {
                            item.isCompleted ?
                                <button
                                    className="menu-btn"
                                    onClick={() => setCompleteTask(item.id, false)}
                                >Отменить завершение</button>
                                :
                                <button
                                    className="menu-btn"
                                    onClick={() => setCompleteTask(item.id, true)}
                                >Завершить</button>
                        }

                        <button className='menu-btn'>Подробнее</button>
                        <button
                            className='menu-btn'
                            onClick={() => tryDeleteTask()}
                        >Удалить</button>
                    </div>
                </Menu>
            </TextBox>

            <DeletingConfirmModal 
                isOpen={isOpenDelConfirm} 
                onClose={() => setIsOpenDelConfirm(false)} 
                onDelete={() => handleDeleteTask(item.id)}/>
        </>

    );
}

export default FocusItem;