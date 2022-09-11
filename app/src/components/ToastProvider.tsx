import { createContext, useContext, useEffect, useState } from "react"
// TODO: https://dev.to/kevjose/building-a-reusable-notification-system-with-react-hooks-and-context-api-2phj
const ctx = createContext(null)
export const ToastProvider = ({children}) => {
  const [toasts, setToasts] = useState([])

  return (
    <ctx.Provider value={{toasts, setToasts}}>
      {children}
    </ctx.Provider>
  );
}

export const useToasts = () => {
  const {toasts, setToasts} = useContext(ctx)
  return {toasts, setToasts}
}
