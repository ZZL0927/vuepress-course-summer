import axios from 'axios'

// 如果是服务端执行，需要加上baseURL
const baseURL = typeof window === 'undefined' ? process.env.API_SERVER : ''

const request = axios.create({
  baseURL
})

export default request
