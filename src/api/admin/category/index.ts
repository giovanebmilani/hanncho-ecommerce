import { adminApi } from '..'
import { createHttpClient } from '../../http-client'

export const categoryApi = createHttpClient('/categories', adminApi)
