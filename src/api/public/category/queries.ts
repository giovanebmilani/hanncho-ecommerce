import { useQuery } from 'react-query'
import { categoryApi } from '.'
import { CategoryDto } from '../../../dtos/Category'
import QUERY_KEYS from '../../../utils/constants/queries'

export const usePublicGetAllCategories = () =>
	useQuery({
		queryKey: [QUERY_KEYS.category],
		queryFn: async () => (await categoryApi.get<CategoryDto[]>('/1')).data
	})
