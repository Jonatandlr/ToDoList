'use client'
import { createContext, useContext, useState } from "react"
import React from 'react'

const taskContext = createContext()

export const TaskProvider = ({ children }) => {
    const [categories, setCategories] = React.useState([])
    const [view, setView] = React.useState('all')

    const dataCategories = async () => {
        const response = await fetch('https://todolistapi-46fv.onrender.com/categories')
        const data = await response.json()
        setCategories(data)
    }
    const [data, setData] = React.useState([]);
    const [tasks, setTasks] = React.useState([]);

    const fetchTasks = async () => {
        await fetch('https://todolistapi-46fv.onrender.com/notes')
            .then((res) => res.json())
            .then((data) => {
                setData(data)
                setTasks(data)
            });

    };

    const setViewCategory = async (name) => {
        if (view == 'all'||view != name) {
            const taskselected = data.filter((task) => task.categories.some((category) => category.CategoryId == name))
            setTasks(taskselected)
            setView(name)
            return
        }
        if (view == name) {
            fetchTasks()
            setView('all')
            return
        }
    }

   









    return (
        <taskContext.Provider value={{ categories, dataCategories, tasks, setTasks, fetchTasks, setViewCategory, view }}>
            {children}
        </taskContext.Provider>
    )
}

export const useTask = () => {

    return useContext(taskContext)
} 
