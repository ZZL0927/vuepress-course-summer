import axios from 'axios'

const baseURL = typeof window === 'undefined' ? process.env.API_SERVER : ''

const request = axios.create({
  baseURL,
  validateStatus: status => status < 500
})

export default request
