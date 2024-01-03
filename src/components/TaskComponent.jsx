'use client'
import React from 'react'
import { FaArrowRight } from "react-icons/fa";
import ModalEditableTask from './ModalEditableTask';
import { useTask } from '@/hooks/taskContext';

export default function TaskComponent({ data }) {
    const {fetchTasks}=useTask()
    const [checked, setChecked] = React.useState(data.completed)
    const [showModal, setShowModal] = React.useState(false)

    const handleClickTask = () => {
        setShowModal(true)
    }

    return (
        <>
            <div className={`flex  items-center bg-white text-black font-semibold px-4 hover:bg-gray-300  rounded-xl w-full`}>
                <button
                    onClick={handleClickTask}
                    
                    className='flex items-center w-full py-4   duration-500 active:scale-95'>
                    <FaArrowRight className='text-violet-400 mr-2 ' />
                    {data.title}
                </button>
                <div className='flex items-center'>
                    <button
                        onClick={async() => {
                            await fetch(`https://todolist-84m2.onrender.com/notes/completed/${data.id}`, {
                                method: 'PUT',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({ completed: !checked })
                            })
                            fetchTasks()	
                            setChecked(!checked)}}
                        className={`w-8 h-8 border-2 rounded-full border-gray-600 ${checked ? 'bg-violet-400' : 'bg-white'} hover:ring-1 ring-violet-400`}
                    />
                </div>
            </div>
            {showModal && (<ModalEditableTask setShowModal={setShowModal} note={data} />)}
        </>
    )
}
