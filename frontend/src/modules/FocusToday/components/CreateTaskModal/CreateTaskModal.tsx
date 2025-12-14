import * as React from 'react';
import Modal from '../../../../ui/Modal/Modal';
import MyButton from '../../../../ui/MyButton/MyButton';
import { useState } from 'react';
import './CreateTaskModal.css'
import MyInput from '../../../../ui/MyInput/MyInput';

interface ICreateTaskModalProps {
    isOpen: boolean,
    onClose: () => void,
    createTask: (title: string) => void
}

function CreateTaskModal({ isOpen, onClose, createTask }: ICreateTaskModalProps) {
    const [title, setTitle] = useState('')

    const createNewTask = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        createTask(title)
        setTitle('')
        onClose()
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <form className="create-task-modal" onSubmit={(e) => createNewTask(e)}>
                <h3 className='create-task-modal-title'>Создать новую задачу</h3>
                <div className="create-task-modal-container">
                    <MyInput style={{width: '250px'}} placeholder='Новая задача' required value={title} onChange={e => setTitle(e.target.value)} />
                    <MyButton type="submit">Добавить</MyButton>
                </div>
            </form>
        </Modal>
    );
}

export default CreateTaskModal;