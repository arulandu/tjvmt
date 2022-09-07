import { createContext, useContext, useEffect, useState } from "react"
import Cookies from 'js-cookie'

const ctx = createContext(null)
export const SessionProvider = ({children}) => {
  const [session, setSession] = useState(null)

  useEffect(() => {
    const s = Cookies.get('auth')
    
    if(s) {
      const auth = JSON.parse(s)
      setSession(auth)
    }
  }, [])

  return (
    <ctx.Provider value={{session, setSession}}>
      {children}
    </ctx.Provider>
  );
}

export const useSession = () => {
  let {session, setSession} = useContext(ctx)
  let changeSession = (v) => {
    Cookies.set('auth', v); setSession(v)
  }
  return {session, setSession: changeSession}
}
