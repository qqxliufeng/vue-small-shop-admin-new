import axios from 'axios'
import qs from 'qs'
import { baseIP } from './urlConfig'

axios.defaults.timeout = 10000
axios.defaults.baseURL = baseIP

axios.interceptors.request.use(
  config => {
    config.data = qs.stringify(config.data)
    if (process.env.NODE_ENV === 'development') {
      console.log(config)
    }
    config.headers = { 'Content-Type': 'application/x-www-form-urlencoded' }
    return config
  },
  error => {
    return Promise.reject(error.response)
  }
)

axios.interceptors.response.use(
  response => {
    if (response.data.resultCode === '404') {
      console.log('找不到')
    } else {
      return response
    }
  },
  error => {
    if (process.env.NODE_ENV === 'development') {
      console.log(error)
    }
    return Promise.reject(error)
  }
)

export default axios
