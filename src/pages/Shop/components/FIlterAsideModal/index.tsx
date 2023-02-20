import './index.scss'
import React, { useEffect, useState } from 'react'
import { useAsideModal } from '../../../../providers/AsideModal/AsideModalProvider'
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
import { usePublicGetAllCollections } from '../../../../api/public/collection/queries'
import { CollectionDto } from '../../../../dtos/Collection'

export interface ProductModalProps {
	filterParams: ProductSearchParams
	updateParams: (params: ProductSearchParams) => void
	cleanParams: () => void
}

const orderingParams: OrderingParam[] = [
	{ id: -1, name: 'Nenhum', type: 'desc', value: undefined },
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
	const [collections, setCollections] = useState<CollectionDto[]>([])
	const [tempParamsState, setTempParamsState] = useState<ProductSearchParams>({ ...filterParams })

	const { data: colorsData } = usePublicGetAllColors()
	const { data: categoriesData } = usePublicGetAllCategories()
	const { data: collectionsData } = usePublicGetAllCollections()

	useEffect(() => {
		if (!colorsData) return
		setColors([{ id: -1, name: 'TODAS', hex: '' }, ...colorsData])
	}, [colorsData])

	useEffect(() => {
		if (!categoriesData) return
		setCategories([{ id: -1, name: 'TODAS' }, ...categoriesData])
	}, [categoriesData])

	useEffect(() => {
		if (!collectionsData) return
		setCollections([
			{ id: -1, name: 'TODAS', description: '', highlightColorHex: '' },
			...collectionsData
		])
	}, [collectionsData])

	const handleCategoryChange = (cat?: CategoryDto) => {
		if (cat?.id === -1)
			return setTempParamsState((prev) => ({
				...prev,
				product: { ...prev.product, categoryId: undefined }
			}))
		return setTempParamsState((prev) => ({
			...prev,
			product: { ...prev.product, categoryId: cat?.id }
		}))
	}

	const handleCollectionChange = (col?: CollectionDto) => {
		if (col?.id === -1)
			return setTempParamsState((prev) => ({
				...prev,
				product: { ...prev.product, collectionId: undefined }
			}))
		return setTempParamsState((prev) => ({
			...prev,
			product: { ...prev.product, collectionId: col?.id }
		}))
	}

	const handleColorChange = (color?: ColorDto) => {
		if (color?.id === -1) return setTempParamsState((prev) => ({ ...prev, colorId: undefined }))
		return setTempParamsState((prev) => ({ ...prev, colorId: color?.id }))
	}

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		const search = e.target.value
		if (!search)
			return setTempParamsState((prev) => ({
				...prev,
				product: { ...prev.product, 'name[contains]': undefined }
			}))
		return setTempParamsState((prev) => ({
			...prev,
			product: { ...prev.product, 'name[contains]': search }
		}))
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
		setTempParamsState({ product: { 'name[contains]': '' } })
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
				<div className='header-title-row'>
					<p className='title'>Filtrar e Organizar</p>
					<div className='exit-button' onClick={() => setAsideModalVisibility?.(false)}>
						<img src={IMAGES.xIcon} />
					</div>
				</div>
				<div className='clear-button'>
					<TextButton type='secondary' onClick={onClearClick}>
						LIMPAR
					</TextButton>
				</div>
			</div>
			<div className='filter-inputs'>
				<Input
					label='PESQUISAR'
					value={tempParamsState.product['name[contains]']}
					onChange={handleSearch}
				/>
				<div className='double-filter-input'>
					<SelectInput
						value={categories.find((cat) => cat.id === tempParamsState.product.categoryId)?.name}
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
				<SelectInput
					value={collections.find((col) => col.id === tempParamsState.product.collectionId)?.name}
					autoCompletion={collections.map((col) => ({ label: col.name, value: col }))}
					onSelectItem={handleCollectionChange}
					label='COLEÇÕES'
				/>
				<div className='check-box-filter-input'>
					<p className='emoji'>🏷️</p>
					<CheckBox
						required={true}
						className='input'
						checked={tempParamsState.sale}
						onChange={handleOnlySaleChange}
					/>
					<p className='sale-long-text'>Mostrar apenas produtos em promoção?</p>
					<p className='sale-short-text'>Apenas promoções?</p>
				</div>
				<SelectInput
					value={
						orderingParams.find((ord) => {
							if (tempParamsState['orderBy[asc]'])
								return ord.type === 'asc' && ord.value === tempParamsState['orderBy[asc]']
							if (tempParamsState['orderBy[desc]'])
								return ord.type === 'desc' && ord.value === tempParamsState['orderBy[desc]']
						})?.name
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
