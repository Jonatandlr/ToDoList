import React from 'react'
import { Formik, Field, Form } from 'formik'
import { useTask } from '@/hooks/taskContext';
import * as Yup from 'yup';

const schemaValid = Yup.object().shape({
    title: Yup.string()
        .required('Se necesita un titulo'),
});

export default function ModalEditableTask({ setShowModal, note }) {

    const { categories, dataCategories, fetchTasks } = useTask()

    let categoriesNote = note.categories.map(category => category.CategoryId)

    return (
        <>
            <div className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'>
                <div className='relative   w-1/2'>
                    {/*content*/}
                    <div className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
                        {/*header*/}
                        <div className='flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t'>
                            <h3 className='text-3xl font-semibold'>
                                New Task
                            </h3>
                            <button
                                className='p-1 ml-auto border-0 text-black opacity-50  float-right text-3xl leading-none font-semibold outline-none focus:outline-none'
                                onClick={() => setShowModal(false)}
                            >
                                <span className=' text-black  h-6 w-6 text-2xl block outline-none focus:outline-none'>
                                    x
                                </span>
                            </button>
                        </div>
                        {/*body*/}
                        <Formik
                            initialValues={{
                                title: note.title,
                                description: note.description,
                                selectedCategories: categoriesNote
                            }}
                            validationSchema={schemaValid}
                            onSubmit={async (values) => {

                                await fetch(`https://todolist-84m2.onrender.com/notes/update/${note.id}`, {
                                    method: 'PUT',
                                    headers: {
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify({
                                        title: values.title,
                                        description: values.description,
                                        categories: values.selectedCategories
                                    })
                                })
                                dataCategories()
                                await fetchTasks()
                                setShowModal(false)
                            }}
                        >{({ errors, touched }) => (
                            <Form className='flex flex-col'>
                                <div className='relative p-6 flex-auto'>
                                    <label
                                        className='block text-gray-700 text-sm font-bold mb-2'
                                        htmlFor="title"> Title</label>
                                    <Field
                                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                        id="title"
                                        name="title"
                                        placeholder="What is your next task?" />
                                    {errors.title && touched.title ? (
                                        <div
                                            className=' text-sm opacity-70'
                                        >{errors.title}</div>
                                    ) : null}


                                    <label
                                        className='block text-gray-700 text-sm font-bold mb-2'
                                        htmlFor="description">description</label>
                                    <Field
                                        className='shadow appearance-none border rounded w-full h-36 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                        as='textarea'
                                        id="description"
                                        name="description"
                                        placeholder="Description" />
                                    <label
                                        className='block text-gray-700 text-sm font-bold mb-2'
                                        htmlFor="description">Etiquetas</label>
                                    <div>
                                        {categories.map(category => (
                                            <label key={category.id} className='mr-2'>
                                                <Field type="checkbox" name="selectedCategories" value={category.name} className='mr-' />
                                                {category.name}
                                            </label>
                                        ))}
                                    </div>
                                </div>
                                {/*footer*/}
                                <div className='flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b'>
                                    {/* button to eliminate */}
                                    <button
                                        className='text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1'
                                        type='button'
                                        style={{ transition: 'all .15s ease' }}
                                        onClick={async () => {
                                            await fetch(`https://todolist-84m2.onrender.com/notes/delete/${note.id}`, {
                                                method: 'DELETE',
                                            })
                                            dataCategories()
                                            await fetchTasks()
                                            setShowModal(false)
                                        }}
                                    >Eliminate</button>
                                    <button
                                        type="submit"
                                        className='bg-violet-400 text-white active:bg-violet-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1'
                                        style={{ transition: 'all .15s ease' }}
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            </Form>
                        )}
                        </Formik>


                    </div>
                </div>
            </div>
            <div className='opacity-25 fixed inset-0 z-40 bg-black'></div>
        </>
    )
}
