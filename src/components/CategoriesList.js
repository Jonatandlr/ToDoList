'use client'
import React from 'react'
import CategoriesEditable from './CategoriesEditable'
import { useTask } from '@/hooks/taskContext'

export default function CategoriesList() {
    // const [categories, setCategories] = React.useState([])
    const { categories, dataCategories,setViewCategory,view} = useTask()
    const [input, setInput] = React.useState('')
    const [error, setError] = React.useState(false)




    React.useEffect(() => {

        dataCategories()
    }, [])


    const handleCreateCategory = async (event) => {
        if (event.key === 'Enter') {
            let nameCategorys = []
            categories.map((category) => nameCategorys.push(category.name))
            if (nameCategorys.includes(input)) {
                setError(true)
                return
            }
            const response = await fetch('https://todolistapi-46fv.onrender.com/categories/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: input,

                })
            })
            const data = await response.json()
            dataCategories()
            setInput('')
            setError(false)
        }
    }

    return (
        <div>
            {categories.map((category) =>
                <div key={category.id}>
                    {
                        category.name == "Personal" ? (
                            <div
                                className={`w-full rounded-[20px] px-3 flex items-center justify-between mt-4 hover:scale-105  duration-300 ${view=='Personal'? 'bg-purple-300':null}`}>
                                <button
                                    onClick={() => {

                                        setViewCategory(category.name)}}
                                    className='flex items-center active:scale-95'>
                                    <div className='w-2 h-2 rounded-full bg-purple-800 mr-2' />
                                    <span className='text-black opacity-60'>{category.name}</span>
                                </button>
                                <span className='text-black opacity-60'>{category.notes.length}</span>
                                
                            </div>
                        ) : null
                    }

                </div>
            )}
            <h4
                className='mt-3 font-medium opacity-40'>Your categories</h4>
            <div className='pl-2'>
                {categories.map((category) =>
                    <div key={category.id}>
                        <CategoriesEditable category={category} />
                    </div>)}
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleCreateCategory}
                    type="text"
                    className='border-2 rounded-[20px] border-purple-800 w-full mt-4 px-2 py-1' placeholder='Add Category' />
                {error ? <div className='flex  justify-center text-sm opacity-70'>Esta Categoria Ya existe</div> : null}
            </div>
        </div>
    )
}
