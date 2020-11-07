import Head from 'next/head'
import { useEffect, useContext } from 'react'

import auth0 from './api/utils/auth0'
import Navbar from '../components/Navbar'
import Todo from '../components/Todo'
import { table, minifyRecords } from './api/utils/airtable'
import { TodosContext } from '../contexts/TodosContext'
import TodoForm from '../components/TodoForm'

export default function Home({ initialTodos, user }) {
  const { todos, setTodos } = useContext(TodosContext)

  useEffect(() => {
    setTodos(initialTodos)
  }, [])

  return (
    <div>
      <Head>
        <title>Authenticated Todo App | Next</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar user={user} />
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
          <p className="bg-yellow-200 text-yellow-800 rounded-lg mt-5 py-4 px-6">
            You need to log in.
          </p>
        )}
      </main>
    </div>
  )
}

export async function getServerSideProps(context) {
  const session = await auth0.getSession(context.req)
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
        user: session.user || null,
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
