import * as React from 'react';
import Modal from '../../../../components/modal/Modal';
import MyButton from '../../../../ui/MyButton/MyButton';
import { useState } from 'react';
import './CreateTaskModal.css'

interface ICreateTaskModalProps {
    isOpen: boolean,
    onClose: () => void,
    createTask: (title: string) => void
}

function CreateTaskModal({ isOpen, onClose, createTask }: ICreateTaskModalProps) {
    const [title, setTitle] = useState('')

    const createNewTask = () => {
        createTask(title)
        setTitle('')
        onClose()
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="create-task-modal">
                <h3 className='create-task-modal-title'>Создать новую задачу</h3>
                <input type="text" placeholder='Новая задача' required value={title} onChange={e => setTitle(e.target.value)} />
                <MyButton onClick={() => createNewTask()}>Добавить</MyButton>
            </div>
        </Modal>
    );
}

export default CreateTaskModal;