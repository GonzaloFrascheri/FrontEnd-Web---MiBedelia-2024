import { decodeJwt } from 'jose'
import storage from './storage'

export function userAuthenticationCheck (router, pathname = '') {
  try {
    const token = storage.getToken()
    // no token found
    if (!token) {
      console.log('No token found')
      storage.clearAllStorage()
      navigateToRoot(router, pathname)
      return null
    }

    const userData = decodeJwt(token)
    // token is expired
    if (isTokenExpired(userData.exp)) {
      console.log('Token is expired')
      storage.clearAllStorage()
      navigateToRoot(router, pathname)
      return null
    }

    return userData
  } catch (error) {
    // some other errors
    console.log(`Something went wrong: ${error.message}`)
    storage.clearAllStorage()
    navigateToRoot(router, pathname)
    return null
  }
}

function navigateToRoot (router, pathname) {
  if (!['', '/', '/login'].includes(pathname)) router.push('/')
}

function isTokenExpired (expiryDate) {
  const currentTime = Math.floor(Date.now() / 1000) // Current time in seconds
  return currentTime > expiryDate
}
