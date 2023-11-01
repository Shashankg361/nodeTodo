import '@/styles/globals.css'
import { createContext, useState } from 'react';
import 'tailwindcss/tailwind.css';

export const userState = createContext()
export default function App({ Component, pageProps }) {
  const [loggedIn , setLoggedIn] = useState(false)

  return <userState.Provider value={{loggedIn , setLoggedIn}}>
            <Component {...pageProps} />
          </userState.Provider>
}
