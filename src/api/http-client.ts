import axios, { AxiosInstance } from 'axios'

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
	}) as HttpClient;

	httpClient.url = baseUrl
	return httpClient
}
