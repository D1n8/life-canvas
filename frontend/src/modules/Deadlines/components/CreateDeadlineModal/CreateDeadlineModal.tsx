import * as React from 'react';
import { useState } from 'react';
import Modal from '../../../../ui/Modal/Modal';
import MyInput from '../../../../ui/MyInput/MyInput';
import MyButton from '../../../../ui/MyButton/MyButton';
import { updateDateFormat } from '../../../../utils/updateDateFormat';

interface ICreateDeadlineModalProps {
    isOpen: boolean,
    onClose: () => void,
    createDeadline: (title: string, due_date: string) => void
}

function CreateDeadlineModal({ isOpen, onClose, createDeadline }: ICreateDeadlineModalProps) {
    const [title, setTitle] = useState('')
    const [dueDate, setDueDate] = useState('')

    const createNewDeadline = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        createDeadline(title, updateDateFormat(dueDate))
        setTitle('')
        setDueDate('')
        onClose()
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <form className="create-deadline-modal" onSubmit={(e) => createNewDeadline(e)}>
                <h3 className='create-deadline-modal-title'>Создать новый дедлайн</h3>
                <div className="create-deadline-modal-container">
                    <MyInput style={{width: '250px'}} placeholder='Название' required value={title} onChange={e => setTitle(e.target.value)} />
                    <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)}/>
                    <MyButton type="submit">Добавить</MyButton>
                </div>
            </form>
        </Modal>
    );
}

export default CreateDeadlineModal;