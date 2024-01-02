'use client'
import React from 'react'
import TaskComponent from './TaskComponent'


export default function TaskList({ tasks }) {
    const sortedTasks = tasks.sort((a, b) => (a.completed === b.completed ? 0 : a.completed ? 1 : -1));
    React.useEffect(() => {
        // console.log(sortedTasks)
    }, [sortedTasks])

    return (
        <div className='grid grid-cols-1 gap-2'>
            {sortedTasks.map((task) => (
                <TaskComponent key={task.id} data={task} />
            ))}
        </div>
    )
}
