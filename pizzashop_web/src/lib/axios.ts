import axios from 'axios'

import { env } from '@/env'

export const api = axios.create({
  baseURL: env.VITE_API_URL,
  withCredentials: true,
})

// Usando interceptor para interceptar todas as requisições afim de adicionar delay na aplicação
if (env.VITE_ENABLE_API_DELAY) {
  // Config são os dados de cada requisção que passa por aqui
  api.interceptors.request.use(async (config) => {
    await new Promise((resolve) => setTimeout(resolve, 2000))

    return config
  })
}
