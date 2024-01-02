'use client'
import React from 'react'
import ModalTask from './ModalTask'

export default function ButtonAddTask() {
    const [showModal, setShowModal] = React.useState(false);
    
    const handleSetModal=(modal)=>
    {
        setShowModal(modal)
    }
    return (
        <div>
            <button  
                onClick={() => handleSetModal(true)}  
                className='bg-white text-violet-400 font-bold px-4 py-2 rounded-xl w-full mt-16 hover:bg-gray-200 duration-500 active:scale-95'>
                Add Task
            </button>
            {
                showModal ? (<ModalTask setShowModal={handleSetModal}/>) : null
            }
        </div>
    )
}
