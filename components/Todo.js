import React, { useContext } from 'react'
import { TodosContext } from '../contexts/TodosContext'

const Todo = ({ todo }) => {
  const { updateTodo, deleteTodo } = useContext(TodosContext)
  const { description, completed } = todo.fields

  const handleToggle = () => {
    const updatedFields = {
      ...todo.fields,
      completed: !completed,
    }
    const updatedTodo = { id: todo.id, fields: updatedFields }
    updateTodo(updatedTodo)
  }

  return (
    <li className="bg-white flex items-center shadow-lg rounded-lg my-2 py-2 px-4">
      <input
        type="checkbox"
        name="completed"
        id="completed"
        checked={completed}
        className="mr-2 form-checkbox h-5 w-5"
        onChange={handleToggle}
      />
      <p className={`flex-1 text-grey-800 ${completed && 'line-through'}`}>
        {description}
      </p>
      <button
        type="button"
        className="text-sm bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded"
        onClick={() => deleteTodo(todo.id)}
      >
        Delete
      </button>
    </li>
  )
}

export default Todo
