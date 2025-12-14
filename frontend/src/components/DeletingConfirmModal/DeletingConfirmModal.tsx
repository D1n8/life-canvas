import * as React from 'react';
import Modal from '../../ui/Modal/Modal';
import MyButton from '../../ui/MyButton/MyButton';
import './DeletingConfirmModal.css'

interface IDeletingConfirmModalProps {
    isOpen: boolean,
    onClose: () => void,
    onDelete: () => void
}

function DeletingConfirmModal({isOpen, onClose, onDelete}: IDeletingConfirmModalProps) {
    return ( 
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="del-conf-modal">
                <h3 className='title'>Вы точно хотите удалить?</h3>
                <div className="btns-container">
                    <MyButton className='btn-del' onClick={() => onDelete()}>Удалить</MyButton>
                    <MyButton className='btn-cancel' onClick={onClose}>Отмена</MyButton>
                </div>
            </div>
        </Modal>
     );
}

export default DeletingConfirmModal;