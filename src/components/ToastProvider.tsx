import { createContext, useContext, useEffect, useReducer, useState } from "react"
import { v4 as uuid } from 'uuid';
// TODO: https://dev.to/kevjose/building-a-reusable-notification-system-with-react-hooks-and-context-api-2phj
const ctx = createContext(null)

export enum ToastAction {
  ADD,
  REMOVE
}

const toastReducer = (state, action) => {
  switch(action.type) {
    case ToastAction.ADD:
      return [
        ...state,
        {
          id: uuid(),
          timestamp: new Date(),
          content: action.payload.content,
          type: action.payload.type,
          duration: action.payload.duration ? action.payload.duration : 5
        }
      ]
    case ToastAction.REMOVE:
      return state.filter(toast => toast.id !== action.payload.id)
  }
}

export const ToastProvider = ({children}) => {
  const [toasts, toastDispatch] = useReducer(toastReducer, [])

  return (
    <ctx.Provider value={{toasts, toastDispatch}}>
      {children}
    </ctx.Provider>
  );
}

export const useToasts = () => {
  const {toasts, toastDispatch} = useContext(ctx)
  return {toasts, toastDispatch}
}
