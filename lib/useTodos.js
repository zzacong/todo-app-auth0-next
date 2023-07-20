import axios from 'axios'
import useSWR, { useSWRConfig } from 'swr'

const fetcher = url => axios.get(url).then(res => res.data)

export const useTodos = () => {
  const { data: todos, error, isLoading } = useSWR('/api/todos', fetcher)
  const { mutate } = useSWRConfig()

  const addTodo = async description => {
    try {
      const { data: newTodo } = await axios.post('/api/todos', {
        description,
      })
      mutate('/api/todos', [newTodo, ...todos], {
        revalidate: false,
      })
    } catch (error) {
      console.error(error)
    }
  }

  const updateTodo = updatedTodo => {
    mutate(
      '/api/todos',
      axios.put(`/api/todos/${updatedTodo.id}`, {
        fields: updatedTodo.fields,
      }),
      {
        populateCache: false,
        optimisticData: todos.map(todo => {
          if (todo.id === updatedTodo.id) return updatedTodo
          return todo
        }),
        revalidate: false,
      }
    )
  }

  const deleteTodo = async id => {
    mutate('/api/todos', axios.delete(`/api/todos/${id}`), {
      optimisticData: todos.filter(todo => todo.id !== id),
      populateCache: false,
      revalidate: false,
    })
  }

  return {
    todos,
    error,
    isLoading,
    updateTodo,
    deleteTodo,
    addTodo,
  }
}
