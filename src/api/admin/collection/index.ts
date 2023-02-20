import { adminApi } from '..'
import { createHttpClient } from '../../http-client'

export const collectionApi = createHttpClient('/collections', adminApi)
