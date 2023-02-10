import React, { useEffect, useMemo, useRef, useState } from 'react'
import ReactPlaceholder from 'react-placeholder/lib'
import { Link, useNavigate } from 'react-router-dom'
import { usePublicGetAllProducts } from '../../api/public/product/queries'
import ConcreteBeam from '../../components/ConcreteBeam'
import IconButton from '../../components/IconButton'
import Loader from '../../components/Loader'
import ProductCard from '../../components/ProductCard'
import TextButton from '../../components/TextButton'
import { PublicProductListDto } from '../../dtos/Product'
import IMAGES from '../../utils/constants/images'
import PAGES from '../../utils/constants/pages'
import './index.scss'

const Home: React.FC = () => {
	const navigate = useNavigate()
	const [highlightedProducts, setHighlightedProducts] = useState<PublicProductListDto[]>([])
	const [saleProducts, setSaleProducts] = useState<PublicProductListDto[]>([])
	const highlightedProductsSliderRef = useRef<HTMLDivElement>(null)
	const highlightedLoaderRef = useRef<HTMLDivElement>(null)
	const saleProductsSliderRef = useRef<HTMLDivElement>(null)
	const saleLoaderRef = useRef<HTMLDivElement>(null)
	const {
		isLoading: isHighlightedLoading,
		data: highlightedData,
		fetchNextPage: fetchNextHighlighted,
		hasNextPage: hasNextHighlighted
	} = usePublicGetAllProducts({ highlighted: true }, 5)

	const {
		isLoading: isSaleLoading,
		data: saleData,
		fetchNextPage: fetchNextSale,
		hasNextPage: hasNextSale
	} = usePublicGetAllProducts({ sale: true }, 5)

	const hightlightedObserver = useMemo(
		() =>
			new IntersectionObserver(([entry]) => {
				if (entry.isIntersecting) fetchNextHighlighted()
			}),
		[highlightedLoaderRef]
	)

	useEffect(() => {
		if (!highlightedLoaderRef.current) return
		hightlightedObserver.observe(highlightedLoaderRef.current)
		return () => hightlightedObserver.disconnect()
	}, [])

	const saleObserver = useMemo(
		() =>
			new IntersectionObserver(([entry]) => {
				if (entry.isIntersecting) fetchNextSale()
			}),
		[saleLoaderRef]
	)

	useEffect(() => {
		if (!saleLoaderRef.current) return
		saleObserver.observe(saleLoaderRef.current)
		return () => saleObserver.disconnect()
	}, [])

	useEffect(() => {
		if (!highlightedData) return
		setHighlightedProducts(highlightedData.pages.flatMap((group) => group.data.map((prod) => prod)))
	}, [highlightedData])

	useEffect(() => {
		if (!saleData) return
		setSaleProducts(saleData.pages.flatMap((group) => group.data.map((prod) => prod)))
	}, [saleData])

	const handleSliderScroll = (
		direction: 'left' | 'right',
		ref: React.RefObject<HTMLDivElement>
	) => {
		const scrollValue =
			direction === 'left' ? -(ref.current?.clientWidth || 0) : ref.current?.clientWidth || 0
		ref.current?.scroll({
			left: ref.current?.scrollLeft + scrollValue,
			behavior: 'smooth'
		})
	}

	return (
		<div className='home-container'>
			<div className='sale-image-container' onClick={() => navigate(PAGES.shop + '?sale=true')}>
				{/* <img src={process.env.PUBLIC_URL + './assets/hanncho-sale.png'} /> */}
			</div>
			{/* <div className='images-container'>
				<ConcreteBeam />
			</div> */}

			<div className='products-container'>
				<div className='products-container-header'>
					<p className='title'>Destaques</p>
					<div className='slider-scroll-buttons'>
						<IconButton onClick={() => handleSliderScroll('left', highlightedProductsSliderRef)}>
							<img className='arrow-to-left' src={IMAGES.arrowIcon} />
						</IconButton>
						<IconButton onClick={() => handleSliderScroll('right', highlightedProductsSliderRef)}>
							<img src={IMAGES.arrowIcon} />
						</IconButton>
					</div>
				</div>
				<div ref={highlightedProductsSliderRef} className='product-slider'>
					{highlightedProducts.map((prod, index) => (
						<ProductCard key={index} product={prod} />
					))}
					{!isHighlightedLoading && !hasNextHighlighted && (
						<div className='show-all'>
							<TextButton onClick={() => navigate(PAGES.shop)} type='secondary'>
								Ver na loja
							</TextButton>
						</div>
					)}
					<div
						ref={highlightedLoaderRef}
						className={`show-all ${hasNextHighlighted ? '' : 'hidden'}`}
					>
						<Loader />
					</div>
				</div>
			</div>

			<div className='products-container'>
				<div className='products-container-header'>
					<p className='title'>Em promoção</p>
					<div className='slider-scroll-buttons'>
						<IconButton onClick={() => handleSliderScroll('left', saleProductsSliderRef)}>
							<img className='arrow-to-left' src={IMAGES.arrowIcon} />
						</IconButton>
						<IconButton onClick={() => handleSliderScroll('right', saleProductsSliderRef)}>
							<img src={IMAGES.arrowIcon} />
						</IconButton>
					</div>
				</div>
				<div className='product-slider' ref={saleProductsSliderRef}>
					{saleProducts.map((prod, index) => (
						<ProductCard key={index} product={prod} />
					))}
					{!isSaleLoading && !hasNextSale && (
						<div className='show-all'>
							<TextButton onClick={() => navigate(PAGES.shop + '?sale=true')} type='secondary'>
								Ver na loja
							</TextButton>
						</div>
					)}
					<div ref={saleLoaderRef} className={`show-all ${hasNextSale ? '' : 'hidden'}`}>
						<Loader />
					</div>
				</div>
			</div>

			<div className='hanncho-info'>
				<div className='text-container'>
					<p className='title'>Conheça a Hanncho</p>
					<p className='text'>
						A Hanncho Clothing é uma marca de roupas cujo nome é inspirado na cultura urbana
						brasileira. <Link to={PAGES.shop}>Visite nossa Loja</Link> de roupas para apostar em
						peças super estilosas e exclusivos da marca.
					</p>
				</div>
				<img className='image' src={IMAGES.knowHannchoImage} />
			</div>
		</div>
	)
}

export default Home
