import { publicApi } from '..'
import { createHttpClient } from '../../http-client'

export const collectionApi = createHttpClient('/collections', publicApi)
