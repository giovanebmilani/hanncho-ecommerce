import { useMutation } from 'react-query'
import { collectionApi } from '.'
import { CollectionCreateDto, CollectionDto } from '../../../dtos/Collection'
import QUERY_KEYS from '../../../utils/constants/queries'
import { queryClient } from '../../query-client'

export const useCollectionCreateMutation = (payload: CollectionCreateDto) =>
	useMutation({
		mutationFn: async () => (await collectionApi.post('', payload)).data as CollectionDto,
		onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.collection] })
	})

export const useCollectionUpdateMutation = (payload: CollectionDto) =>
	useMutation({
		mutationFn: async () => (await collectionApi.put(`/${payload.id}`, payload)).data as CollectionDto,
		onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.collection] })
	})

export const useCollectionDeleteMutation = () =>
	useMutation({
		mutationFn: async (collectionId: number) =>
			(await collectionApi.delete(`/${collectionId}`)).data as CollectionDto,
		onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.collection] })
	})
