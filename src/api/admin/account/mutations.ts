import { useMutation } from 'react-query'
import { accountApi } from '.'
import { AccountLoginDto, AuthDto } from '../../../dtos/Account'

export const useLoginMutation = (payload: AccountLoginDto) =>
	useMutation({
		mutationFn: () =>
			accountApi.post('/login', payload).then((res) => res.data as AuthDto)
	})
