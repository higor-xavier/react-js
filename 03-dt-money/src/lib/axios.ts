import axios from 'axios'

// Todas as requisições serão enviadas pro URL que ficará definido no axios
export const api = axios.create({
  baseURL: 'http://localhost:3000',
})
