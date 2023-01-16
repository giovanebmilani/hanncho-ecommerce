import { createHttpClient } from './http-client'

export const baseApi = createHttpClient(process.env.REACT_APP_API_BASE_URL || '')
