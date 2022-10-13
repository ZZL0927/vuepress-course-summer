import axios from 'axios'

const instance = axios.create({})

instance.interceptors.request.use()
instance.interceptors.response.use()

export default instance
