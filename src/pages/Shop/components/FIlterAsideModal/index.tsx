import './index.scss'
import React, { useEffect, useState } from 'react'
import { useAsideModal } from '../../../../providers/AsideModal/AsideModalProvider'
import IconButton from '../../../../components/IconButton'
import IMAGES from '../../../../utils/constants/images'
import Input from '../../../../components/Input'
import SelectInput from '../../../../components/SelectInput'
import { OrderingParam, ProductSearchParams } from '../..'
import { ColorDto } from '../../../../dtos/Color'
import { CategoryDto } from '../../../../dtos/Category'
import { usePublicGetAllColors } from '../../../../api/public/color/queries'
import { usePublicGetAllCategories } from '../../../../api/public/category/queries'
import TextButton from '../../../../components/TextButton'
import CheckBox from '../../../../components/CheckBox'
import Button from '../../../../components/Button'

export interface ProductModalProps {
	filterParams: ProductSearchParams
	updateParams: (params: ProductSearchParams) => void
	cleanParams: () => void
}

const orderingParams: OrderingParam[] = [
	{ id: -1, name: 'Nenhum', type: 'desc', value: 'price' },
	{ id: 1, name: 'Preço desc.', type: 'desc', value: 'price' },
	{ id: 2, name: 'Preço cresc.', type: 'asc', value: 'price' },
	{ id: 3, name: 'Maior desconto', type: 'desc', value: 'discount' },
	{ id: 4, name: 'Menor desconto', type: 'asc', value: 'discount' }
]

export const FilterAsideModal: React.FC<ProductModalProps> = ({
	filterParams,
	updateParams,
	cleanParams
}) => {
	const { hidden, setAsideModalVisibility } = useAsideModal()
	const [colors, setColors] = useState<ColorDto[]>([])
	const [categories, setCategories] = useState<CategoryDto[]>([])
	const [tempParamsState, setTempParamsState] = useState<ProductSearchParams>({ ...filterParams })

	const { data: colorsData } = usePublicGetAllColors()
	const { data: categoriesData } = usePublicGetAllCategories()

	useEffect(() => {
		if (!colorsData) return
		setColors([{ id: -1, name: 'TODAS', hex: '' }, ...colorsData])
	}, [colorsData])

	useEffect(() => {
		if (!categoriesData) return
		setCategories([{ id: -1, name: 'TODAS' }, ...categoriesData])
	}, [categoriesData])

	const handleCategoryChange = (cat?: CategoryDto) => {
		if (cat?.id === -1) return setTempParamsState((prev) => ({ ...prev, categoryId: undefined }))
		return setTempParamsState((prev) => ({ ...prev, categoryId: cat?.id }))
	}

	const handleColorChange = (color?: ColorDto) => {
		if (color?.id === -1) return setTempParamsState((prev) => ({ ...prev, colorId: undefined }))
		return setTempParamsState((prev) => ({ ...prev, colorId: color?.id }))
	}

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		const search = e.target.value
		if (!search) return setTempParamsState((prev) => ({ ...prev, 'name[contains]': undefined }))
		return setTempParamsState((prev) => ({ ...prev, 'name[contains]': search }))
	}

	const handleOrderByChange = (ord?: OrderingParam) => {
		if (ord?.id === -1)
			return setTempParamsState((prev) => ({
				...prev,
				'orderBy[asc]': undefined,
				'orderBy[desc]': undefined
			}))
		if (ord?.type === 'asc')
			return setTempParamsState((prev) => ({
				...prev,
				'orderBy[asc]': ord.value,
				'orderBy[desc]': undefined
			}))
		if (ord?.type === 'desc')
			return setTempParamsState((prev) => ({
				...prev,
				'orderBy[desc]': ord.value,
				'orderBy[asc]': undefined
			}))
	}

	const handleOnlySaleChange = () => {
		setTempParamsState((prev) => ({ ...prev, sale: prev.sale ? undefined : true }))
	}

	const onClearClick = () => {
		setTempParamsState({})
		cleanParams()
		setAsideModalVisibility?.(false)
	}

	const onFilterClick = () => {
		updateParams(tempParamsState)
		setAsideModalVisibility?.(false)
	}

	return (
		<div className={'filter-aside-modal'}>
			<div className='filters-header'>
				<p className='title'>Filtrar e Organizar</p>
				<div className='exit-button' onClick={() => setAsideModalVisibility?.(false)}>
					<img src={IMAGES.xIcon} />
				</div>
			</div>
			<div className='filter-inputs'>
				<div className='clear-button'>
					<TextButton type='secondary' onClick={onClearClick}>
						LIMPAR
					</TextButton>
				</div>

				<Input
					label='PESQUISAR'
					value={tempParamsState['name[contains]']}
					onChange={handleSearch}
				/>
				<div className='double-filter-input'>
					<SelectInput
						value={categories.find((cat) => cat.id === tempParamsState.categoryId)?.name}
						autoCompletion={categories.map((cat) => ({ label: cat.name, value: cat }))}
						onSelectItem={handleCategoryChange}
						label='CATEGORIAS'
					/>
					<SelectInput
						value={colors.find((color) => color.id === tempParamsState.colorId)?.name}
						autoCompletion={colors.map((color) => ({ label: color.name, value: color }))}
						onSelectItem={handleColorChange}
						label='CORES'
					/>
				</div>
				<div className='check-box-filter-input'>
					<p className='emoji'>🏷️</p>
					<CheckBox
						required={true}
						className='input'
						checked={tempParamsState.sale}
						onChange={handleOnlySaleChange}
					/>
					<p>Mostrar apenas produtos em promoção?</p>
				</div>
				<SelectInput
					value={
						orderingParams.find(
							(ord) =>
								ord.value === tempParamsState['orderBy[asc]'] ||
								ord.value === tempParamsState['orderBy[desc]']
						)?.name
					}
					autoCompletion={orderingParams.map((ord) => ({ label: ord.name, value: ord }))}
					onSelectItem={handleOrderByChange}
					label='ORDENAR POR'
				/>
			</div>
			<div className='buttons'>
				<Button onClick={onFilterClick}>FILTRAR</Button>
			</div>
		</div>
	)
}

export default FilterAsideModal
