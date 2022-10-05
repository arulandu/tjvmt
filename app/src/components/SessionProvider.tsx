import { createContext, useContext, useEffect, useState } from "react"
import Cookies from 'js-cookie'

const ctx = createContext(null)
export const SessionProvider = ({ children }) => {
  const [session, setSession] = useState(null)
  const [user, setUser] = useState({})

  useEffect(() => {
    const s = Cookies.get('auth')

    if (s) {
      const auth = JSON.parse(s)
      setSession(auth)

      if (auth && auth.access_token) {
        const options = {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${auth.access_token}`
          }
        }
        fetch('/api/auth/authorize', options).then(res => res.json()).then((data) => setUser(data.user))
      } else {
        setUser({});
      }
    }
  }, [])

  return (
    <ctx.Provider value={{ session, user, setSession }}>
      {children}
    </ctx.Provider>
  );
}

export const useSession = () => {
  let { session, user, setSession } = useContext(ctx)
  let changeSession = (v) => {
    Cookies.set('auth', v); setSession(v)
  }
  return { session, user: !user ? {} : user, setSession: changeSession }
}
