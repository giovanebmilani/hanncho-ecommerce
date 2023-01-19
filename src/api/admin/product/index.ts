import { adminApi } from '..'
import { createHttpClient } from '../../http-client'

export const productApi = createHttpClient('/products', adminApi)
