import React from 'react'
import { FaTasks } from "react-icons/fa";
import DashboardTask from '../components/DashboardTask';
import CategoriesList from '../components/CategoriesList';
import { TaskProvider } from '@/hooks/taskContext';

export default function page() {

  return (
    <TaskProvider>
      <div className='min-h-screen bg-slate-900 flex'>

        <aside className='bg-white w-1/4 min-h-screen flex flex-col px-6 pt-16'>
          <h1 className='text-violet-400 text-3xl font-bold'>My Daily <br /> To Do List</h1>
          <div className='border-b-[3px] w-1/2  border-purple-800 mt-1' />
          <div className=' w-full h-full py-16'>
            <h4 className='text-black opacity-60 text-2xl font-bold flex items-center'><FaTasks className='mr-2 text-purple-400' />Today Task</h4>
            <CategoriesList />
          </div>
        </aside>
        
        <main className='bg-violet-400  w-3/4 min-h-screen pb-16 flex flex-col px-16'>
          <DashboardTask />
        </main>
      </div>
    </TaskProvider>
  )
}
