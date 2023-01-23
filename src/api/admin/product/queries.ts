import { useQuery } from 'react-query'
import { productApi } from '.'
import { PaginatedDto } from '../../../dtos/Pagination'
import { ProductDto, ProductFilterDto } from '../../../dtos/Product'
import { VariantDto, VariantImageDto } from '../../../dtos/Variant'
import QUERY_KEYS from '../../../utils/constants/queries'

export const useGetAllProducts = (filters: ProductFilterDto, page: number, perPage = 10) =>
	useQuery({
		queryKey: [QUERY_KEYS.product, page, filters],
		queryFn: async () =>
			(
				await productApi.get<PaginatedDto<ProductDto>>('', {
					params: { ...filters, page, perPage }
				})
			).data
	})

export const useGetProduct = (productId?: number) =>
	useQuery({
		enabled: !!productId,
		queryKey: [QUERY_KEYS.product, productId],
		queryFn: async () => (await productApi.get<ProductDto>(`/${productId}`)).data
	})

export const useGetProductVariants = (productId?: number) =>
	useQuery({
		enabled: !!productId,
		queryKey: [QUERY_KEYS.variant, QUERY_KEYS.product, productId],
		queryFn: async () => (await productApi.get<VariantDto[]>(`/${productId}/variants`)).data
	})

export const useGetVariantImages = (productId?: number, variantId?: number) =>
	useQuery({
		queryKey: [QUERY_KEYS.variant, QUERY_KEYS.product, productId, variantId],
		queryFn: async () =>
			(await productApi.get<VariantImageDto[]>(`/${productId}/variants/${variantId}/images`)).data
	})
