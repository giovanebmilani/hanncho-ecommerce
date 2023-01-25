import { useInfiniteQuery, useQuery } from 'react-query'
import { productApi } from '.'
import { PaginatedDto } from '../../../dtos/Pagination'
import {
	PublicProductFilterDto,
	PublicProductDto,
	PublicProductListDto
} from '../../../dtos/Product'
import QUERY_KEYS from '../../../utils/constants/queries'
import { extractNextPageNumber, extractPrevPageNumber } from '../../../utils/pagination'

export const usePublicGetAllProducts = (filters: PublicProductFilterDto, perPage = 10) =>
	useInfiniteQuery({
		queryKey: [QUERY_KEYS.product, QUERY_KEYS.variant, filters],
		queryFn: async ({ pageParam }) =>
			(
				await productApi.get<PaginatedDto<PublicProductListDto>>('', {
					params: { ...filters, page: pageParam, perPage }
				})
			).data,
		getNextPageParam: extractNextPageNumber,
		getPreviousPageParam: extractPrevPageNumber
	})

export const usePublicGetProduct = (productId?: number) =>
	useQuery({
		enabled: !!productId,
		queryKey: [QUERY_KEYS.product, productId],
		queryFn: async () => (await productApi.get<PublicProductDto>(`/${productId}`)).data
	})
