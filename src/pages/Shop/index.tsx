import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { usePublicGetAllProducts } from '../../api/public/product/queries'
import Loader from '../../components/Loader'
import ProductCard from '../../components/ProductCard'
import TextButton from '../../components/TextButton'
import { PublicProductListDto } from '../../dtos/Product'
import { useAsideModal } from '../../providers/AsideModal/AsideModalProvider'
import PAGES from '../../utils/constants/pages'
import FilterAsideModal from './components/FIlterAsideModal'
import './index.scss'

type OrderByProductQuery = 'price' | 'discount' | string

export interface ProductSearchParams {
	colorId?: number
	sale?: true
	'orderBy[desc]'?: OrderByProductQuery
	'orderBy[asc]'?: OrderByProductQuery
	product: {
		'name[contains]'?: string
		categoryId?: number
	}
}

export interface OrderingParam {
	id: number
	name: string
	type: 'asc' | 'desc'
	value?: OrderByProductQuery
}

const Shop: React.FC = () => {
	const navigate = useNavigate()
	const { setAsideModalVisibility, setAsideModalContent } = useAsideModal()
	const [searchParams, setSearchParams] = useSearchParams()
	const [filterParams, setFilterParams] = useState<ProductSearchParams>({ product: {} })
	const ref = useRef<HTMLDivElement>(null)

	const [products, setProducts] = useState<PublicProductListDto[]>([])

	const {
		isLoading: isProductsLoading,
		data: productsData,
		fetchNextPage: fetchNextProducts,
		hasNextPage: hasNextProducts
	} = usePublicGetAllProducts({ ...filterParams }, 8)

	const observer = useMemo(
		() =>
			new IntersectionObserver(([entry]) => {
				if (entry.isIntersecting) fetchNextProducts()
			}),
		[ref]
	)

	useEffect(() => {
		if (!ref.current) return
		observer.observe(ref.current)
		return () => observer.disconnect()
	}, [])

	useEffect(() => {
		const params: ProductSearchParams = { product: {} }

		if (searchParams.has('product.categoryId'))
			params.product.categoryId =
				parseInt(searchParams.get('product.categoryId') || '') || undefined

		if (searchParams.has('colorId'))
			params.colorId = parseInt(searchParams.get('colorId') || '') || undefined

		if (searchParams.has('product.name[contains]'))
			params.product['name[contains]'] = searchParams.get('product.name[contains]') || undefined

		if (searchParams.has('sale'))
			params.sale = searchParams.get('sale') === 'true' ? true : undefined

		if (searchParams.has('orderBy[desc]'))
			params['orderBy[desc]'] = searchParams.get('orderBy[desc]') || undefined

		if (searchParams.has('orderBy[asc]'))
			params['orderBy[asc]'] = searchParams.get('orderBy[asc]') || undefined

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
				if (typeof value === 'object') {
					for (const [k, v] of Object.entries(value)) {
						if (v) {
							if (firstFlag) {
								queryString = queryString.concat('?')
								firstFlag = false
							} else {
								queryString = queryString.concat('&')
							}
							queryString = queryString.concat(key + '.' + k + '=' + v)
						}
					}
				} else {
					if (firstFlag) {
						queryString = queryString.concat('?')
						firstFlag = false
					} else {
						queryString = queryString.concat('&')
					}
					queryString = queryString.concat(key + '=' + value)
				}
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
					{products.length <= 0 ? (
						<p>Nenhum produto encontrado...</p>
					) : (
						products.map((prod, index) => <ProductCard key={index} product={prod} />)
					)}
				</div>
				<div ref={ref} className={`products-loader-container ${hasNextProducts ? '' : 'hidden'}`}>
					<div className='loader'></div>
				</div>
			</div>
		</div>
	)
}

export default Shop
