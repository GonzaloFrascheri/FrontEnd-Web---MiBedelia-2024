import axios from 'axios'
import storage from './storage'

function authRequestInterceptor(config) {
  config.headers.Accept = 'application/json'
  config.headers['Authorization'] = `Bearer ${storage.getToken()}`
  config.headers['Access-Control-Allow-Origin'] = '*'
  return config
}

const axiosInstance = axios.create({
  baseURL: process.env.BASE_URL
})

axiosInstance.interceptors.request.use(authRequestInterceptor)

export default axiosInstance
