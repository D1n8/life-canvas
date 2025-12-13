import * as React from 'react';
import cl from './ButtonAdd.module.css'

interface IBtnAddProps {
    openModal: () => void
}

function ButtonAdd({openModal}: IBtnAddProps) {
    return ( <button className={cl.btnAdd} onClick={() => openModal()}>+</button> );
}

export default ButtonAdd;