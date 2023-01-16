import { baseApi } from '..'
import { createHttpClient } from '../http-client'

export const adminApi = createHttpClient('/admin', baseApi)
