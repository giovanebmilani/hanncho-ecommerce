import { useMutation } from 'react-query'
import { colorApi } from '.'
import { ColorCreateDto, ColorDto } from '../../../dtos/Color'
import QUERY_KEYS from '../../../utils/constants/queries'
import { queryClient } from '../../query-client'

export const useColorCreateMutation = (payload: ColorCreateDto) =>
	useMutation({
		mutationFn: () => colorApi.post('', payload).then((res) => res.data as ColorDto),
		onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.color] })
	})

export const useColorUpdateMutation = (payload: ColorDto) =>
	useMutation({
		mutationFn: () => colorApi.put(`/${payload.id}`, payload).then((res) => res.data as ColorDto),
		onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.color] })
	})

export const useColorDeleteMutation = () =>
	useMutation({
		mutationFn: (colorId: number) => colorApi.delete(`/${colorId}`).then((res) => res.data as ColorDto),
		onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.color] })
	})
