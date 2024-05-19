
const storagePrefix = 'mibedelia_'
const userSessionToken = `${storagePrefix}tokenFront`
const userSessionData = `${storagePrefix}userData`

const storage = {
    getUser: () => JSON.parse(localStorage.getItem(userSessionData) || {}),
    setUser: (user) => localStorage.setItem(userSessionData, JSON.stringify(user)),
    clearUser: () => localStorage.removeItem(userSessionData),
    getToken: () => localStorage.getItem(userSessionToken) || '',
    setToken: (token) => localStorage.setItem(userSessionToken, token),
    clearToken: () => localStorage.removeItem(userSessionToken),
}

export default storage;