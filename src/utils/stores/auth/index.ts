import { STORE_KEYS } from '../../constants/stores'

export const getAuthToken = () => {
	return localStorage.getItem(STORE_KEYS.token)
}

export const setAuthToken = (token?: string) => {
	if (token) {
		localStorage.setItem(STORE_KEYS.token, token)
	} else {
		localStorage.removeItem(STORE_KEYS.token)
	}
}
