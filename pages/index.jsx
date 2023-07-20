import Head from 'next/head'
import { getSession } from '@auth0/nextjs-auth0'
import { useUser } from '@auth0/nextjs-auth0/client'

import { table, minifyRecords } from '~/server/airtable'

import Navbar from '~/components/Navbar'
import Todo from '~/components/Todo'
import { useTodos } from '~/lib/useTodos'
import TodoForm from '~/components/TodoForm'

export default function HomePage() {
  const { todos } = useTodos()
  const { user } = useUser()

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
  const session = await getSession(ctx.req, ctx.res)
  let todos = []

  if (session?.user) {
    todos = await table
      .select({ filterByFormula: `userId = '${session.user.sub}'` })
      .firstPage()
  }
  return {
    props: {
      fallback: {
        '/api/todos': minifyRecords(todos),
      },
    },
  }
}
