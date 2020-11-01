import { createContext, useState } from 'react'
import axios from 'axios'

const TodosContext = createContext()

const TodosProvider = ({ children }) => {
  const [todos, setTodos] = useState([])

  const refreshTodos = async () => {
    try {
      const { data } = await axios.get('/api/getTodos')
      setTodos(data)
    } catch (error) {
      console.error(error)
    }
  }

  const addTodo = async description => {
    try {
      const { data: newTodo } = await axios.post('/api/createTodo', {
        description,
      })
      setTodos(prevTodos => [newTodo, ...prevTodos])
    } catch (error) {
      console.error(error)
    }
  }

  const updateTodo = async updatedTodo => {
    try {
      await axios.put('/api/updateTodo', {
        id: updatedTodo.id,
        fields: updatedTodo.fields,
      })
      setTodos(prevTodos => {
        const existingTodos = [...prevTodos]
        const existingTodo = existingTodos.find(
          todo => todo.id === updatedTodo.id
        )
        existingTodo.fields = updatedTodo.fields
        return existingTodos
      })
    } catch (error) {
      console.error(error)
    }
  }

  const deleteTodo = async id => {
    try {
      await axios.delete('/api/deleteTodo', { data: { id } })
      setTodos(prevTodos => {
        return prevTodos.filter(todo => todo.id !== id)
      })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <TodosContext.Provider
      value={{
        todos,
        setTodos,
        refreshTodos,
        updateTodo,
        deleteTodo,
        addTodo,
      }}
    >
      {children}
    </TodosContext.Provider>
  )
}

export { TodosProvider, TodosContext }
