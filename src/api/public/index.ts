import { baseApi } from '..'
import { createHttpClient } from '../http-client'

export const publicApi = createHttpClient('/public', baseApi)
