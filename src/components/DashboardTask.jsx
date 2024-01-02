'use client'
import React from 'react'
import ButtonAddTask from './ButtonAddTask'
import TaskList from './TaskList'
import { useTask } from '@/hooks/taskContext';

function DashboardTask() {
  
  const {tasks,fetchTasks}=useTask()

 

  React.useEffect(() => {
    fetchTasks();
    
  }, []); // Se ejecuta al montar el componente
  
  return (
    <div>
      <h2 className='text-white text-3xl font-bold px-6 pt-16'>DashBoard</h2>
      <section >
        <ButtonAddTask />
        <div className=' mt-10'>
          <TaskList tasks={tasks}/>
        </div>
      </section>
    </div>
  )
}

export default DashboardTask