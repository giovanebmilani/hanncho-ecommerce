import { useMutation } from 'react-query'
import { productApi } from '.'
import { ProductCreateDto, ProductDto, ProductUpdateDto } from '../../../dtos/Product'
import { VariantCreateDto, VariantDto, VariantUpdateDto } from '../../../dtos/Variant'
import QUERY_KEYS from '../../../utils/constants/queries'
import { queryClient } from '../../query-client'

export const useProductCreateMutation = (payload: ProductCreateDto) =>
	useMutation({
		mutationFn: () => productApi.post('', payload).then((res) => res.data as ProductDto),
		onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.product] })
	})

export const useProductUpdateMutation = (payload: ProductUpdateDto) =>
	useMutation({
		mutationFn: () =>
			productApi.put(`/${payload.id}`, payload).then((res) => res.data as ProductDto),
		onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.product] })
	})

export const useProductDeleteMutation = () =>
	useMutation({
		mutationFn: (productId: number) =>
			productApi.delete(`/${productId}`).then((res) => res.data as ProductDto),
		onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.product] })
	})

export const useProductVariantCreateMutation = (productId: number, payload: VariantCreateDto) =>
	useMutation({
		mutationFn: () =>
			productApi.post(`/${productId}/variants`, payload).then((res) => res.data as VariantDto),
		onSuccess: () =>
			queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.variant, QUERY_KEYS.product] })
	})

export const useProductVariantUpdateMutation = (
	productId: number,
	variantId: number,
	payload: VariantUpdateDto
) =>
	useMutation({
		mutationFn: () =>
			productApi
				.put(`/${productId}/variants/${variantId}`, payload)
				.then((res) => res.data as VariantDto),
		onSuccess: () =>
			queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.variant, QUERY_KEYS.product] })
	})

export const useProductVariantDeleteMutation = () =>
	useMutation({
		mutationFn: (params: { productId: number; variantId: number }) =>
			productApi
				.delete(`/${params.productId}/variants/${params.variantId}`)
				.then((res) => res.data as VariantDto),
		onSuccess: () =>
			queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.variant, QUERY_KEYS.product] })
	})

export const useProductVariantImageUploadMutation = (productId: number, variantId: number) =>
	useMutation({
		mutationFn: () =>
			productApi.post(`/${productId}/variants/${variantId}/images`).then((res) => res.data as VariantDto),
		onSuccess: () =>
			queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.variant, QUERY_KEYS.product] })
	})
