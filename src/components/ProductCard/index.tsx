import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PublicProductListDto } from '../../dtos/Product'
import IMAGES from '../../utils/constants/images'
import PAGES from '../../utils/constants/pages'
import ProductStructureData from '../ProductStructuredData'
import './index.scss'

export interface ProductCardProps {
	onClick?: VoidFunction
	product: PublicProductListDto
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
	const navigate = useNavigate()
	const [force, setForce] = useState<number>(0)

	useEffect(() => {
		setTimeout(() => setForce(1), 50)
	}, [])

	const calculateDiscount = (basePrice: number, price: number) => {
		return 100 - (100 * price) / basePrice
	}

	const isInSale = () => product.basePrice !== product.price

	const handleClick = () => {
		navigate(PAGES.product(product.id))
	}

	return (
		<div
			onClick={handleClick}
			className={`product-card-container ${isInSale() ? 'sale' : ''} ${force ? 'active' : ''}`}
		>
			<ProductStructureData product={product} />
			{product.soldOut && (
				<div className='sold-out-grid'>
					<p>SOLD OUT</p>
				</div>
			)}
			{isInSale() && (
				<div className='sale-tag'>
					<div className='inner-tag'>
						{calculateDiscount(product.basePrice, product.price).toFixed(0)}% OFF
					</div>
				</div>
			)}
			<div className='image-container'>
				<img src={product.mainImage.url ? product.mainImage.url : IMAGES.imagePlaceholder} />
			</div>
			<div className='product-info'>
				<p className='product-name'>
					{product.name}
				</p>
				{!product.soldOut && (
					<div className='product-price-container'>
						{isInSale() && <p className='base-price'>R${product.basePrice.toFixed(2)}</p>}
						<p className='price'>R${product.price.toFixed(2)}</p>
					</div>
				)}
			</div>
		</div>
	)
}

export default ProductCard
