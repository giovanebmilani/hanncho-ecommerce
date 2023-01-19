import { useMutation } from 'react-query'
import { productApi } from '.'
import { ProductCreateDto, ProductDto, ProductUpdateDto } from '../../../dtos/Product'
import QUERY_KEYS from '../../../utils/constants/queries'
import { queryClient } from '../../query-client'

export const useProductCreateMutation = (payload: ProductCreateDto) =>
	useMutation({
		mutationFn: () => productApi.post('', payload).then((res) => res.data as ProductDto),
		onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.product] })
	})

export const useProductUpdateMutation = (payload: ProductUpdateDto) =>
	useMutation({
		mutationFn: () => productApi.put(`/${payload.id}`, payload).then((res) => res.data as ProductDto),
		onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.product] })
	})

export const useProductDeleteMutation = () =>
	useMutation({
		mutationFn: (productId: number) => productApi.delete(`/${productId}`).then((res) => res.data as ProductDto),
		onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.product] })
	})
