import './index.scss'
import React, { useEffect, useState } from 'react'
import Input from '../../../../../components/Input'
import { useModal } from '../../../../../providers/Modal/ModalProvider'
import Button from '../../../../../components/Button'
import Loader from '../../../../../components/Loader'
import { ProductDto } from '../../../../../dtos/Product'
import { CategoryDto } from '../../../../../dtos/Category'
import {
	useProductCreateMutation,
	useProductUpdateMutation
} from '../../../../../api/admin/product/mutations'
import SelectInput from '../../../../../components/SelectInput'
import { useGetAllCategories } from '../../../../../api/admin/category/queries'

export interface ProductModalProps {
	product?: ProductDto
	isEdit?: boolean
	confirmHandler?: (name: string, hex: string) => void
}

export const ProductModal: React.FC<ProductModalProps> = ({ product, isEdit, confirmHandler }) => {
	const { hidden, setVisibility } = useModal()
	const [name, setName] = useState<string>(product?.name || '')
	const [description, setDescription] = useState<string>(product?.name || '')
	const [categories, setCategories] = useState<CategoryDto[]>([])
	const [category, setCategory] = useState<CategoryDto | undefined>(product?.category)
	const { data: categoriesData } = useGetAllCategories()
	const {
		isLoading: isCreationLoading,
		isSuccess: isCreationSuccess,
		mutate: creationMutate
	} = useProductCreateMutation({
		name,
		description,
		categoryId: category?.id || 0
	})
	const {
		isLoading: isUpdateLoading,
		isSuccess: isUpdateSuccess,
		mutate: updateMutate
	} = useProductUpdateMutation({
		id: product?.id || 0,
		name,
		description,
		categoryId: category?.id || 0
	})

	useEffect(() => {
		if (!categoriesData) return
		setCategories(categoriesData)
	}, [categoriesData])

	useEffect(() => {
		if (isUpdateSuccess || isCreationSuccess) {
			setName('')
			setDescription('')
			setCategory(undefined)
			setVisibility?.(false)
		}
	}, [isUpdateSuccess, isCreationSuccess])

	useEffect(() => {
		if (!product) {
			setName('')
			setDescription('')
			setCategory(undefined)
			return
		}
		setName(product.name)
		setDescription(product.description)
		setCategory(product.category)
	}, [hidden])

	const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setName(e.target.value)
	}

	const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setDescription(e.target.value)
	}

	const handleCategoryChange = (cat?: CategoryDto) => {
		setCategory(cat)
	}

	const handleCancelClick = () => {
		setVisibility?.(false)
	}

	const isConfirmButtonDisabled = !name || !description || isCreationLoading || isUpdateLoading

	return (
		<div className={'color-modal'}>
			<p className='title'>{isEdit ? 'Editar Produto' : 'Adicionar Produto'}</p>
			<Input label='NOME' value={name} onChange={handleNameChange} />
			<Input label='DESCRIÇÃO' value={description} onChange={handleDescriptionChange} />
			<SelectInput
				value={category?.name}
				autoCompletion={categories.map((cat) => ({ label: cat.name, value: cat }))}
				onSelectItem={handleCategoryChange}
				label='CATEGORIA'
				required
			/>
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

export default ProductModal
