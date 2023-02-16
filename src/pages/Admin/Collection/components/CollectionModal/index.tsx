import './index.scss'
import React, { useEffect, useState } from 'react'
import Input from '../../../../../components/Input'
import { useModal } from '../../../../../providers/Modal/ModalProvider'
import Button from '../../../../../components/Button'
import Loader from '../../../../../components/Loader'
import {
	useCollectionCreateMutation,
	useCollectionUpdateMutation
} from '../../../../../api/admin/collection/mutations'
import { CollectionDto } from '../../../../../dtos/Collection'
import ColorViewer from '../../../../../components/ColorViewer'
import { ChromePicker, Color } from 'react-color'

export interface CollectionModalProps {
	collection?: CollectionDto
	isEdit?: boolean
}

export const CollectionModal: React.FC<CollectionModalProps> = ({
	collection,
	isEdit
}) => {
	const { hidden, setVisibility } = useModal()
	const [name, setName] = useState<string>(collection?.name || '')
	const [description, setDescription] = useState<string>(collection?.description || '')
	const [pickedColor, setPickedColor] = useState<Color | undefined>()
	const [highlightColorHex, setHighlightColorHex] = useState<string>(
		collection?.highlightColorHex || ''
	)
	const {
		isLoading: isCreationLoading,
		isSuccess: isCreationSuccess,
		mutate: creationMutate
	} = useCollectionCreateMutation({
		name,
		description,
		highlightColorHex
	})
	const {
		isLoading: isUpdateLoading,
		isSuccess: isUpdateSuccess,
		mutate: updateMutate
	} = useCollectionUpdateMutation({
		id: collection?.id || 0,
		name,
		description,
		highlightColorHex
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
			setDescription('')
			setHighlightColorHex('')
			setPickedColor(undefined)
			setVisibility?.(false)
		}
	}, [isUpdateSuccess, isCreationSuccess])

	useEffect(() => {
		if (!collection) {
			setName('')
			setDescription('')
			setHighlightColorHex('')
			setPickedColor(undefined)
			return
		}
		setName(collection.name)
		setDescription(collection.description)
		setHighlightColorHex(collection.highlightColorHex)
		setPickedColor(hexToRgb(collection.highlightColorHex))
	}, [hidden])

	const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setName(e.target.value)
	}

	const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setDescription(e.target.value)
	}

	const handleHexChange = (color: any) => {
		setHighlightColorHex(color.hex.replace('#', ''))
		setPickedColor(color)
	}

	const handleCancelClick = () => {
		setVisibility?.(false)
	}

	const isConfirmButtonDisabled = !name || isCreationLoading || isUpdateLoading

	return (
		<div className={'collection-modal'}>
			<p className='title'>{isEdit ? 'Editar Coleção' : 'Adicionar Coleção'}</p>
			<Input label='NOME' value={name} onChange={handleNameChange} />
			<Input label='DESCRIÇÃO' value={description} onChange={handleDescriptionChange} />
			<div className='color-pick-area'>
				<ChromePicker onChange={handleHexChange} disableAlpha={true} color={pickedColor} />
				<div className='color-view'>
					<ColorViewer hex={highlightColorHex} />
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

export default CollectionModal
