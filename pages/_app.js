import '../styles/tailwind.css'
import { UserProvider } from '@auth0/nextjs-auth0'
import { TodosProvider } from '../contexts/TodosContext'

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <TodosProvider>
        <div className="container mx-auto my-10 max-w-xl">
          <Component {...pageProps} />
        </div>
      </TodosProvider>
    </UserProvider>
  )
}

export default MyApp
