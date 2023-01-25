import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { usePublicGetAllProducts } from '../../api/public/product/queries'
import ConcreteBeam from '../../components/ConcreteBeam'
import Loader from '../../components/Loader'
import ProductCard from '../../components/ProductCard'
import TextButton from '../../components/TextButton'
import { PublicProductListDto } from '../../dtos/Product'
import IMAGES from '../../utils/constants/images'
import './index.scss'

const Home: React.FC = () => {
	const navigate = useNavigate()
	const [products, setProducts] = useState<PublicProductListDto[]>([])
	const { isLoading, data, fetchNextPage, hasNextPage } = usePublicGetAllProducts(
		{ highlighted: true },
		5
	)
	const loaderRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const options = {
			root: null,
			rootMargin: '20px',
			threshold: 1.0
		}

		const observer = new IntersectionObserver((entities) => {
			const target = entities[0]

			if (target.isIntersecting) {
				fetchNextPage()
			}
		}, options)

		if (loaderRef.current) {
			observer.observe(loaderRef.current)
		}
	}, [])

	useEffect(() => {
		if (!data) return
		setProducts(data.pages.flatMap((group) => group.data.map((prod) => prod)))
	}, [data])

	return (
		<div className='home-container'>
			<div className='images-container'>
				<div className='sale-image-container' onClick={() => navigate('/loja')}>
					<img src={process.env.PUBLIC_URL + './assets/hanncho-sale.png'} />
				</div>
				<ConcreteBeam />
			</div>

			<div className='highlighted-products'>
				<p className='title'>Destaques</p>
				<div className='product-slider'>
					{products.map((prod, index) => (
						<ProductCard key={index} product={prod} />
					))}
					<div className='show-all'>
						{hasNextPage ? (
							<div className='loader' ref={loaderRef}></div>
						) : (
							<TextButton type='secondary'>Ver tudo</TextButton>
						)}
					</div>
				</div>
			</div>

			<div className='hanncho-info'>
				<div className='text-container'>
					<p className='title'>Conheça a Hanncho</p>
					<p className='text'>
						A Hanncho Clothing é uma marca de roupas cujo nome é inspirado na cultura urbana
						brasileira. <Link to='/loja'>Visite nossa Loja</Link> de roupas para apostar em peças
						super estilosas e exclusivos da marca.
					</p>
				</div>
				<img className='image' src={IMAGES.knowHannchoImage} />
			</div>
		</div>
	)
}

export default Home
