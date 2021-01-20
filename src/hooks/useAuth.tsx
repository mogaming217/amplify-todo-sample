import React, { useState, useEffect, createContext, ReactNode, useContext } from 'react'
import { User } from 'model/user'
import { Auth } from 'aws-amplify'
import { useRouter } from 'next/dist/client/router'

type UseAuthErrorCode = 'unexpected'

type AuthReturnType = {
  loading: boolean
  user?: User
  error?: UseAuthErrorCode
}

const _useAuth = (): AuthReturnType => {
  const [authState, setAuth] = useState<AuthReturnType>({ loading: true })
  const router = useRouter()

  useEffect(() => {
    if (!process.browser) return
    const load = async () => {
      try {
        console.log('fetch current user')
        const user = await Auth.currentAuthenticatedUser()
        console.log(user)
        setAuth({ loading: false, user: new User(user.attributes.sub, true) })
      } catch {
        if (router.pathname.startsWith('/auth')) return
        // router.push('/auth')
      }
    }

    void load()
  }, [router])
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
