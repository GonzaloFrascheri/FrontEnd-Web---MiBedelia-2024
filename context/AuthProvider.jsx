import { createContext, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import storage from '@/utils/storage'
import { isTokenExpired } from '@/utils/auth'
import { decodeJwt } from 'jose'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(null)
  const router = useRouter()

  useEffect(() => {
    const token = storage.getToken()
    if (!token) {
      console.log('No token found')
      navigateToRoot(router)
      return
    }

    try {
      const decodedData = decodeJwt(token)
      if (isTokenExpired(decodedData.exp)) {
        console.log('Token is expired')
        navigateToRoot(router)
        return
      }
      setUserData(decodedData)
    } catch (error) {
      console.log(`Something went wrong: ${error.message}`)
      navigateToRoot(router)
    }
  }, [router])

  function navigateToRoot (router) {
    router.replace('/')
  }

  return (
    <AuthContext.Provider value={userData}>{children}</AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
