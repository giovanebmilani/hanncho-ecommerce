import { useQuery } from 'react-query'
import { productApi } from '.'
import { PaginatedDto } from '../../../dtos/Pagination'
import { ProductDto, ProductFilterDto } from '../../../dtos/Product'
import QUERY_KEYS from '../../../utils/constants/queries'

export const useGetAllProducts = (filters: ProductFilterDto, page: number, perPage = 10) =>
	useQuery({
		queryKey: [QUERY_KEYS.product, page, filters],
		queryFn: async () =>
			(
				await productApi.get<PaginatedDto<ProductDto>>('', {
					params: { ...filters, page, perPage }
				})
			).data,
	})
