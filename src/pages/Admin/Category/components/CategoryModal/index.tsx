import './index.scss'
import React, { useEffect, useState } from 'react'
import Input from '../../../../../components/Input'
import { useModal } from '../../../../../providers/Modal/ModalProvider'
import Button from '../../../../../components/Button'
import { CategoryDto } from '../../../../../dtos/Category'
import {
	useCategoryCreateMutation,
	useCategoryUpdateMutation
} from '../../../../../api/admin/category/mutations'
import Loader from '../../../../../components/Loader'

export interface CategoryModalProps {
	category?: CategoryDto
	isEdit?: boolean
	confirmHandler?: (name: string, hex: string) => void
}

export const CategoryModal: React.FC<CategoryModalProps> = ({
	category,
	isEdit,
	confirmHandler
}) => {
	const { hidden, setVisibility } = useModal()
	const [name, setName] = useState<string>(category?.name || '')
	const {
		isLoading: isCreationLoading,
		isSuccess: isCreationSuccess,
		mutate: creationMutate
	} = useCategoryCreateMutation({
		name
	})
	const {
		isLoading: isUpdateLoading,
		isSuccess: isUpdateSuccess,
		mutate: updateMutate
	} = useCategoryUpdateMutation({
		id: category?.id || 0,
		name
	})

	useEffect(() => {
		if (isUpdateSuccess || isCreationSuccess) {
			setName('')
			setVisibility?.(false)
		}
	}, [isUpdateSuccess, isCreationSuccess])

	useEffect(() => {
		if (!category) {
			setName('')
			return
		}
		setName(category.name)
	}, [hidden])

	const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setName(e.target.value)
	}

	const handleCancelClick = () => {
		setVisibility?.(false)
	}

	const isConfirmButtonDisabled = !name || isCreationLoading || isUpdateLoading

	return (
		<div className={'category-modal'}>
			<p className='title'>{isEdit ? 'Editar Categoria' : 'Adicionar Categoria'}</p>
			<Input label='NOME' value={name} onChange={handleNameChange} />
			<div className='buttons'>
				<Button type='danger' onClick={handleCancelClick}>
					CANCELAR
				</Button>
				{isCreationLoading || isUpdateLoading ? (
					<div className='loader-container'><Loader /></div>
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

export default CategoryModal
