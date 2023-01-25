import React from 'react'
import { PublicProductListDto } from '../../dtos/Product'
import IMAGES from '../../utils/constants/images'
import './index.scss'

export interface ProductCardProps {
	onClick?: VoidFunction
	product: PublicProductListDto
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
	const calculateDiscount = (basePrice: number, price: number) => {
		return 100 - (100 * price) / basePrice
	}

	const isInSale = () => product.basePrice !== product.price

	return (
		<div className={`product-card-container ${isInSale() ? 'sale' : ''}`}>
			{/* <div className='sale-tag'>
				<div className='inner-tag'>
					{calculateDiscount(product.basePrice, product.price).toFixed(0)}% OFF
				</div>
			</div> */}
			<img src={product.mainImage.url ? product.mainImage.url : IMAGES.imagePlaceholder} />
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
