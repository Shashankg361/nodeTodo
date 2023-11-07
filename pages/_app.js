import '@/styles/globals.css'
import { createContext, useState } from 'react';
import 'tailwindcss/tailwind.css';

export const userState = createContext()
export default function App({ Component, pageProps }) {
  const [loggedIn , setLoggedIn] = useState(false)
  const [count , setCount] = useState('')

  return <userState.Provider value={{loggedIn , setLoggedIn , count , setCount}}>
            <Component {...pageProps} />
          </userState.Provider>
}
