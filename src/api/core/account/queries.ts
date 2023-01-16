import { useQuery } from 'react-query'
import { accountApi } from '.'
import { AccountDto } from '../../../dtos/Account'
import QUERY_KEYS from '../../../utils/constants/queries'

export const useGetSelfAccount = () =>
	useQuery({
		queryKey: [QUERY_KEYS.account],
		queryFn: () => accountApi.get<AccountDto>('').then((res) => res.data)
	})
