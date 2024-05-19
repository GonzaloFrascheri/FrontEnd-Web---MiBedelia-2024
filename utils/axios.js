import { Axios } from 'axios'
import storage from './storage'
import dotenv from 'dotenv'
dotenv.config()

function authRequestInterceptor (config) {
  config.headers.Accept = 'application/json'
  config.headers['Authorization'] = `Bearer ${storage.getToken()}`
  config.headers['Access-Control-Allow-Origin'] = '*'

  return config
}

export const axios = Axios.create({
  baseUrl: process.env.BASE_URL
})

axios.interceptors.request.use(authRequestInterceptor)
axios.interceptors.response.use(response => {
  return response.data
})
