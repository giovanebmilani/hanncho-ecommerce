import React, { useEffect, useState } from 'react'
import { PublicProductListDto } from '../../dtos/Product'
import IMAGES from '../../utils/constants/images'
import './index.scss'

export interface ProductCardProps {
	onClick?: VoidFunction
	product: PublicProductListDto
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
	const [force, setForce] = useState<number>(0)

	useEffect(() => {
		setTimeout(() => setForce(1), 50)
	}, [])

	const calculateDiscount = (basePrice: number, price: number) => {
		return 100 - (100 * price) / basePrice
	}

	const isInSale = () => product.basePrice !== product.price

	return (
		<div className={`product-card-container ${isInSale() ? 'sale' : ''} ${force ? 'active' : ''}`}>
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
				<p className='product-name'>{product.name}</p>
				<div className='product-price-container'>
					{isInSale() && <p className='base-price'>R${product.basePrice.toFixed(2)}</p>}
					<p className='price'>R${product.price.toFixed(2)}</p>
				</div>
			</div>
		</div>
	)
}

export default ProductCard
