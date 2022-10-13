import axios from 'axios'

const request = axios.create({
  validateStatus: status => status < 500
})

export default request
