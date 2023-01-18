import { useQuery } from 'react-query'
import { colorApi } from '.'
import { ColorDto } from '../../../dtos/Color'
import QUERY_KEYS from '../../../utils/constants/queries'

export const useGetAllColors = () =>
	useQuery({
		queryKey: [QUERY_KEYS.color],
		queryFn: async () => (await colorApi.get<ColorDto[]>('')).data
	})
