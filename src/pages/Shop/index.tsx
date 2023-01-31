import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { usePublicGetAllCategories } from '../../api/public/category/queries'
import { usePublicGetAllColors } from '../../api/public/color/queries'
import { usePublicGetAllProducts } from '../../api/public/product/queries'
import Input from '../../components/Input'
import Loader from '../../components/Loader'
import ProductCard from '../../components/ProductCard'
import SelectInput from '../../components/SelectInput'
import TextButton from '../../components/TextButton'
import { CategoryDto } from '../../dtos/Category'
import { ColorDto } from '../../dtos/Color'
import { PublicProductListDto } from '../../dtos/Product'
import { useAsideModal } from '../../providers/AsideModal/AsideModalProvider'
import PAGES from '../../utils/constants/pages'
import FilterAsideModal from './components/FIlterAsideModal'
import './index.scss'

type OrderByProductQuery = 'price' | 'discount'

export interface ProductSearchParams {
	categoryId?: number
	colorId?: number
	sale?: true
	'orderBy[desc]'?: OrderByProductQuery
	'orderBy[asc]'?: OrderByProductQuery
	'name[contains]'?: string
}

export interface OrderingParam {
	id: number
	name: string
	type: 'asc' | 'desc'
	value: OrderByProductQuery
}

const Shop: React.FC = () => {
	const navigate = useNavigate()
	const { setAsideModalVisibility, setAsideModalContent } = useAsideModal()
	const [searchParams, setSearchParams] = useSearchParams()
	const [filterParams, setFilterParams] = useState<ProductSearchParams>({})

	const [products, setProducts] = useState<PublicProductListDto[]>([])

	const {
		isLoading: isProductsLoading,
		data: productsData,
		fetchNextPage: fetchNextProducts,
		hasNextPage: hasNextProducts
	} = usePublicGetAllProducts({ ...filterParams }, 20)

	useEffect(() => {
		const params: ProductSearchParams = {}

		if (searchParams.has('categoryId'))
			params.categoryId = parseInt(searchParams.get('categoryId') || '') || undefined

		if (searchParams.has('colorId'))
			params.colorId = parseInt(searchParams.get('colorId') || '') || undefined

		if (searchParams.has('name[contains]'))
			params['name[contains]'] = searchParams.get('name[contains]') || undefined

		if (searchParams.has('sale'))
			params.sale = searchParams.get('sale') === 'true' ? true : undefined

		setFilterParams(params)
	}, [searchParams])

	useEffect(() => {
		if (!productsData) return
		setProducts(productsData.pages.flatMap((group) => group.data.map((prod) => prod)))
	}, [productsData])

	const onFilterClick = () => {
		setAsideModalContent?.(
			<FilterAsideModal
				filterParams={filterParams}
				updateParams={updateParams}
				cleanParams={cleanParams}
			/>
		)
		setAsideModalVisibility?.(true)
	}

	const serializeQuery = (params: ProductSearchParams) => {
		let queryString = ''
		let firstFlag = true
		for (const [key, value] of Object.entries(params)) {
			if (value) {
				if (firstFlag) {
					queryString = queryString.concat('?')
					firstFlag = false
				} else {
					queryString = queryString.concat('&')
				}
				queryString = queryString.concat(key + '=' + value)
			}
		}
		return queryString
	}

	const cleanParams = () => {
		setSearchParams(new URLSearchParams())
	}

	const updateParams = (params: ProductSearchParams) => {
		setSearchParams(new URLSearchParams(serializeQuery({ ...filterParams, ...params })))
	}

	const onBackClick = () => {
		navigate(PAGES.home)
	}

	return (
		<div className='shop-container'>
			<div className='content'>
				<TextButton type='secondary' onClick={onBackClick}>
					VOLTAR
				</TextButton>
				<p className='title'>Loja</p>
				<TextButton type='secondary' onClick={onFilterClick}>
					FILTRAR E ORGANIZAR
				</TextButton>

				<div className='products-catalog'>
					{isProductsLoading ? (
						<Loader />
					) : products.length <= 0 ? (
						<p>Nenhum produto encontrado...</p>
					) : (
						products.map((prod, index) => <ProductCard key={index} product={prod} />)
					)}
				</div>
			</div>
		</div>
	)
}

export default Shop
