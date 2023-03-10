import { useQuery } from 'react-query'
import { colorApi } from '.'
import { ColorDto } from '../../../dtos/Color'
import QUERY_KEYS from '../../../utils/constants/queries'

export const usePublicGetAllColors = () =>
	useQuery({
		queryKey: [QUERY_KEYS.color],
		queryFn: async () => (await colorApi.get<ColorDto[]>('/1')).data
	})
