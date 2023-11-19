import './index.scss'
import React, { useEffect, useState } from 'react'
import { ColorDto } from '../../../../../dtos/Color'
import Input from '../../../../../components/Input'
import { useModal } from '../../../../../providers/Modal/ModalProvider'
import Button from '../../../../../components/Button'
import {
	useColorCreateMutation,
	useColorUpdateMutation
} from '../../../../../api/admin/color/mutations'
import Loader from '../../../../../components/Loader'
import { ChromePicker, Color } from 'react-color'
import ColorViewer from '../../../../../components/ColorViewer'

export interface ColorModalProps {
	color?: ColorDto
	isEdit?: boolean
	confirmHandler?: (name: string, hex: string) => void
}

export const ColorModal: React.FC<ColorModalProps> = ({ color, isEdit, confirmHandler }) => {
	const { hidden, setVisibility } = useModal()
	const [name, setName] = useState<string>(color?.name || '')
	const [pickedColor, setPickedColor] = useState<Color | undefined>()
	const [hex, setHex] = useState<string>(color?.hex || '')
	const {
		isLoading: isCreationLoading,
		isSuccess: isCreationSuccess,
		mutate: creationMutate
	} = useColorCreateMutation({
		name,
		hex
	})
	const {
		isLoading: isUpdateLoading,
		isSuccess: isUpdateSuccess,
		mutate: updateMutate
	} = useColorUpdateMutation({
		id: color?.id || 0,
		name,
		hex
	})

	const hexToRgb = (hex: string) => {
		const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i
		hex = hex.replace(shorthandRegex, function (m, r, g, b) {
			return r + r + g + g + b + b
		})

		const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
		return result
			? {
					r: parseInt(result[1], 16),
					g: parseInt(result[2], 16),
					b: parseInt(result[3], 16)
			  }
			: undefined
	}

	useEffect(() => {
		if (isUpdateSuccess || isCreationSuccess) {
			setName('')
			setHex('')
			setVisibility?.(false)
		}
	}, [isUpdateSuccess, isCreationSuccess])

	useEffect(() => {
		if (!color) {
			setName('')
			setHex('')
			setPickedColor(undefined)
			return
		}
		setName(color.name)
		setHex(color.hex)
		setPickedColor(hexToRgb(color.hex))
	}, [hidden])

	const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setName(e.target.value)
	}

	const handleHexChange = (color: any) => {
		setHex(color.hex.replace('#', ''))
		setPickedColor(color)
	}

	const handleCancelClick = () => {
		setVisibility?.(false)
	}

	const isConfirmButtonDisabled = !name || !hex || isCreationLoading || isUpdateLoading

	return (
		<div className={'color-modal'}>
			<p className='title'>{isEdit ? 'Editar Cor' : 'Adicionar Cor'}</p>
			<Input label='NOME' value={name} onChange={handleNameChange} />
			<div className='color-pick-area'>
				<ChromePicker onChange={handleHexChange} disableAlpha={true} color={pickedColor} />
				<div className='color-view'>
					<ColorViewer hex={[hex]} />
				</div>
			</div>

			<div className='buttons'>
				<Button type='danger' onClick={handleCancelClick}>
					CANCELAR
				</Button>
				{isCreationLoading || isUpdateLoading ? (
					<div className='loader-container'>
						<Loader />
					</div>
				) : (
					<Button
						type='primary'
						onClick={isEdit ? updateMutate : creationMutate}
						disabled={isConfirmButtonDisabled}
					>
						{isEdit ? 'EDITAR' : 'CRIAR'}
					</Button>
				)}
			</div>
		</div>
	)
}

export default ColorModal
