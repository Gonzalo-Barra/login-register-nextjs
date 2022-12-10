import axios from 'axios'

const api = axios.create({
  baseURL: process.env.api
})

export default api