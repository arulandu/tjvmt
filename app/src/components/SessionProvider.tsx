import { createContext, useContext, useEffect, useState } from "react"
import Cookies from 'js-cookie'

const ctx = createContext(null)
export const SessionProvider = ({children}) => {
  const [session, setSession] = useState(null)

  useEffect(() => {
    const s = Cookies.get('auth')
    if(s) {
      setSession(JSON.parse(s))
    }
  }, [])

  return (
    <ctx.Provider value={session}>
      {children}
    </ctx.Provider>
  );
}

export const useSession = () => {
  return useContext(ctx)
}