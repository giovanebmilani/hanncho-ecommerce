import { QueryClient } from 'react-query'

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry(failureCount, error) {
				// Retry only if failed less than 3 times and if the error is on the network.
				return failureCount < 3 && error instanceof Error && error.message === 'Network Error'
			},
			staleTime: 1000 * 60 * 5, // 5 Minutes in millis to consider fetched data as stale/outdated
			cacheTime: 1000 * 60 * 5, // 5 Minutes in millis to remove cached data
			refetchOnWindowFocus: false
		}
	}
})
