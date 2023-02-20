import { useInfiniteQuery, useQueries, useQuery } from 'react-query'
import { productApi } from '.'
import { PaginatedDto } from '../../../dtos/Pagination'
import {
	PublicProductFilterDto,
	PublicProductDto,
	PublicProductListDto,
	ProductCartDto
} from '../../../dtos/Product'
import QUERY_KEYS from '../../../utils/constants/queries'
import { extractNextPageNumber, extractPrevPageNumber } from '../../../utils/pagination'

export const usePublicGetAllProducts = (filters: PublicProductFilterDto, perPage = 10) =>
	useInfiniteQuery({
		queryKey: [QUERY_KEYS.product, QUERY_KEYS.variant, filters],
		queryFn: async ({ pageParam }) =>
			(
				await productApi.get<PaginatedDto<PublicProductListDto>>('/1', {
					params: { ...filters, page: pageParam, perPage }
				})
			).data,
		getNextPageParam: extractNextPageNumber,
		getPreviousPageParam: extractPrevPageNumber
	})

export const usePublicGetProduct = (productId?: number, size?: string) =>
	useQuery({
		enabled: !!productId,
		queryKey: [QUERY_KEYS.product, productId, size],
		queryFn: async () => (await productApi.get<PublicProductDto>(`/1/${productId}`)).data
	})

export const usePublicGetCartProducts = (products: ProductCartDto[]) =>
	useQueries(
		products.map((prod) => ({
			queryKey: [QUERY_KEYS.product, prod.id, prod.size],
			queryFn: async () => {
				const data = (await productApi.get<PublicProductDto>(`/1/${prod.id}`)).data
				data.size = prod.size
				return data
			}
		}))
	)
