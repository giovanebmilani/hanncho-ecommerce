import { publicApi } from '..'
import { createHttpClient } from '../../http-client'

export const productApi = createHttpClient('/products', publicApi)
