import React from 'react'
import { useTask } from '@/hooks/taskContext'

function CategoriesEditable({ category }) {
    const [hoverInCategory, setHoverInCategory] = React.useState(false)
    const {dataCategories,setViewCategory,view,fetchTasks} = useTask()

    const handleEliminateCategory = async (event) => {
        await fetch(`https://todolist-84m2.onrender.com/categories/delete/${category.id}`, {
            method: 'DELETE',
        }) 
        dataCategories() 
    }


    return (
        <div>
            {category.name != 'Personal' ? (
                <div
                    onMouseOver={() => setHoverInCategory(true)}
                    onMouseLeave={() => setHoverInCategory(false)}
                    className={`w-full rounded-[20px] px-3 flex items-center justify-between mt-4 hover:scale-105  duration-300 ${view==category.name? 'bg-purple-300':null}`}>
                        
                    <button
                        onClick={async() => {
                            // fetchTasks()
                            setViewCategory(category.name)
                        }}
                        className='flex items-center active:scale-95'>
                        <div className='w-2 h-2 rounded-full bg-purple-800 mr-2' />
                        <span className='text-black opacity-60'>{category.name}</span>
                    </button>
                    <div>
                        {hoverInCategory ? (
                            <button 
                            onClick={handleEliminateCategory}
                            className='text-black opacity-60 mr-5 active:scale-95'>x</button>
                        ) : null}
                        <span className='text-black opacity-60'>{category.notes.length}</span>
                    </div>
                </div>
            ) : null
            }

        </div >
    )
}

export default CategoriesEditable