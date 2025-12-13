import * as React from 'react';
import TextBox from '../../../../ui/TextBox/TextBox';
import type { IFocusItem } from '../../types/models';
import MoreVert from '../../../../ui/MoreVert/MoreVert';
import './FocusItem.css'
import { useRef, useState } from 'react';
import Menu from '../../../../ui/Menu/Menu';

function FocusItem(item: IFocusItem) {
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

    return (
        <TextBox className='focus-item'>
            <span className='focus-item-text'>{item.title}</span>
            <MoreVert ref={moreRef} setOpen={() => { handleOpen() }} />
            <Menu style={{ top: menuPosition.top + 5, left: menuPosition.left }} className='focus-item-more-menu' isOpen={isOpenMenu} onClose={() => setIsOpenMenu(false)}>menu</Menu>
        </TextBox>
    );
}

export default FocusItem;