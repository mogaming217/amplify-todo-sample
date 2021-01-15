import React, { useState, useEffect, createContext, ReactNode, useContext } from 'react'
import { User } from 'model/user'

type UseAuthErrorCode = 'unexpected'

type AuthReturnType = {
  loading: boolean
  user?: User
  error?: UseAuthErrorCode
}

const _useAuth = (): AuthReturnType => {
  const [authState, setAuth] = useState<AuthReturnType>({ loading: true })
  useEffect(() => {
    setAuth({ loading: false })
  }, [])
  return authState
}

export const AuthContext = createContext<AuthReturnType>({ loading: true })

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const state = _useAuth()
  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  return useContext(AuthContext)
}
