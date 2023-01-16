import { adminApi } from '..'
import { createHttpClient } from '../../http-client'

export const accountApi = createHttpClient('/accounts', adminApi)
