import Head from 'next/head'
import { useEffect, useContext } from 'react'

import Navbar from '../components/Navbar'
import Todo from '../components/Todo'
import { table, minifyRecords } from './api/utils/airtable'
import { TodosContext } from '../contexts/TodosContext'

export default function Home({ initialTodos }) {
  const { todos, setTodos } = useContext(TodosContext)

  useEffect(() => {
    setTodos(initialTodos)
  }, [])

  return (
    <div>
      <Head>
        <title>Authenticated Todo App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main>
        <h1>Todo App</h1>
        <ul>
          {todos && todos.map(todo => <Todo key={todo.id} todo={todo} />)}
        </ul>
      </main>
    </div>
  )
}

export async function getServerSideProps(context) {
  try {
    const todos = await table.select({}).firstPage()
    return {
      props: {
        initialTodos: minifyRecords(todos),
      },
    }
  } catch (error) {
    console.error(error)
    return {
      props: {
        error: 'Something went wrong.',
      },
    }
  }
}
