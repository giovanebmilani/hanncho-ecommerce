import axios, { AxiosInstance } from 'axios'
import authStorage from '../utils/stores/auth'

export interface HttpClient extends AxiosInstance {
	url: string
}

export const createHttpClient = (url: string, parent?: HttpClient) => {
	const baseUrl = parent ? parent.url + url : url

	const httpClient = axios.create({
		baseURL: baseUrl,
		headers: {
			'Content-Type': 'application/json'
		}
	}) as HttpClient

	httpClient.url = baseUrl

	httpClient.interceptors.request.use((config: any) => {
		const token = authStorage.getAuthToken()
		if (config.headers && token) {
			config.headers.Authorization = `Bearer ${token}`
		}
		return config
	})

	return httpClient
}