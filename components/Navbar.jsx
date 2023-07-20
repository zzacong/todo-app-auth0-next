/* eslint-disable @next/next/no-html-link-for-pages */
import { useUser } from '@auth0/nextjs-auth0/client'

export default function Navbar() {
  const { user } = useUser()

  return (
    <nav className="flex justify-between items-center py-4">
      <p className="text-2xl font-bold text-grey-800">My Todo</p>
      <div className="flex">
        {user ? (
          <a
            href="/api/auth/logout"
            className="rounded bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 mr-2"
          >
            Logout
          </a>
        ) : (
          <a
            href="/api/auth/login"
            className="rounded bg-blue-500 hover:bg-blue-600 text-white py-2 px-4"
          >
            Login
          </a>
        )}
      </div>
    </nav>
  )
}
