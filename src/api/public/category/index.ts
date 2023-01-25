import { publicApi } from '..'
import { createHttpClient } from '../../http-client'

export const categoryApi = createHttpClient('/categories', publicApi)
