import '~/styles/tailwind.css'

import { UserProvider } from '@auth0/nextjs-auth0/client'
import { SWRConfig } from 'swr'

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <SWRConfig value={{ fallback: pageProps.fallback }}>
        <div className="container mx-auto my-10 max-w-xl">
          <Component {...pageProps} />
        </div>
      </SWRConfig>
    </UserProvider>
  )
}

export default MyApp
