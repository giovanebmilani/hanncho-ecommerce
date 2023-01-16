import { coreApi } from '..'
import { createHttpClient } from '../../http-client'

export const accountApi = createHttpClient('/accounts', coreApi)
