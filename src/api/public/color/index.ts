import { publicApi } from '..'
import { createHttpClient } from '../../http-client'

export const colorApi = createHttpClient('/colors', publicApi)
