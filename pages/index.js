import Head from 'next/head'
import { useEffect, useContext } from 'react'
import { getSession, useUser } from '@auth0/nextjs-auth0'

import Navbar from '../components/Navbar'
import Todo from '../components/Todo'
import { table, minifyRecords } from './api/utils/airtable'
import { TodosContext } from '../contexts/TodosContext'
import TodoForm from '../components/TodoForm'

export default function Home({ initialTodos }) {
  const { todos, setTodos } = useContext(TodosContext)
  const { user } = useUser()

  useEffect(() => {
    setTodos(initialTodos)
  }, [initialTodos, setTodos])

  return (
    <div>
      <Head>
        <title>Authenticated Todo App | Next</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main>
        {user ? (
          <>
            <h1 className="text-2xl text-center mb-4">My Todo List</h1>
            <TodoForm />
            <ul>
              {todos && todos.map(todo => <Todo key={todo.id} todo={todo} />)}
            </ul>
          </>
        ) : (
          <p className="bg-yellow-100 text-gray-800 rounded-lg mt-5 py-4 px-6">
            You need to log in.
          </p>
        )}
      </main>
    </div>
  )
}

export async function getServerSideProps(ctx) {
  const session = getSession(ctx.req, ctx.res)
  let todos = []

  try {
    if (session?.user) {
      todos = await table
        .select({ filterByFormula: `userId = '${session.user.sub}'` })
        .firstPage()
    }
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
