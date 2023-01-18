import { useMutation } from 'react-query'
import { categoryApi } from '.'
import { CategoryCreateDto, CategoryDto } from '../../../dtos/Category'
import QUERY_KEYS from '../../../utils/constants/queries'
import { queryClient } from '../../query-client'

export const useCategoryCreateMutation = (payload: CategoryCreateDto) =>
	useMutation({
		mutationFn: async () => (await categoryApi.post('', payload)).data as CategoryDto,
		onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.category] })
	})

export const useCategoryUpdateMutation = (payload: CategoryDto) =>
	useMutation({
		mutationFn: async () => (await categoryApi.put(`/${payload.id}`, payload)).data as CategoryDto,
		onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.category] })
	})

export const useCategoryDeleteMutation = () =>
	useMutation({
		mutationFn: async (categoryId: number) =>
			(await categoryApi.delete(`/${categoryId}`)).data as CategoryDto,
		onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.category] })
	})
