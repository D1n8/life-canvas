import * as React from 'react';
import cl from './Menu.module.css'

interface IMenuProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode,
    isOpen: boolean,
    onClose: () => void
}

function Menu({ children, isOpen, onClose, ...props }: IMenuProps) {
    if (!isOpen) return null

    const {className, ...restProps} = props

    return (
        <div className={cl.menuOverlay} onClick={onClose}>
            <div className={cl.menu + ' ' + className} {...restProps} onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>

    );
}

export default Menu;