import { useQuery } from 'react-query'
import { collectionApi } from '.'
import { CollectionDto } from '../../../dtos/Collection'
import QUERY_KEYS from '../../../utils/constants/queries'

export const useGetAllCollections = () =>
	useQuery({
		queryKey: [QUERY_KEYS.collection],
		queryFn: async () => (await collectionApi.get<CollectionDto[]>('')).data
	})
