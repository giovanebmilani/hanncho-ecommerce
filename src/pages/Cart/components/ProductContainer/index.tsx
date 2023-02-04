import './index.scss'
import React, { useEffect, useState } from 'react'
import { PublicProductDto } from '../../../../dtos/Product'
import ColorViewer from '../../../../components/ColorViewer'
import IconButton from '../../../../components/IconButton'
import IMAGES from '../../../../utils/constants/images'
import { useCart } from '../../../../providers/Cart/CartProvider'
import { useNavigate } from 'react-router-dom'
import PAGES from '../../../../utils/constants/pages'

export interface ProductContainerProps {
	product: PublicProductDto
}

export const ProductContainer: React.FC<ProductContainerProps> = ({ product }) => {
	const navigate = useNavigate()
	const [force, setForce] = useState<number>(0)
	const { removeProduct } = useCart()

	useEffect(() => {
		setTimeout(() => setForce(1), 50)
	}, [])

	const onRemoveClick = () => {
		if (!product) return
		setForce(0)
		setTimeout(() => removeProduct?.(product.id, product?.size), 500)
		setTimeout(() => setForce(1), 600)
	}

	return (
		<div className={`cart-product-container ${force ? 'active' : ''} `}>
			<div className='image-container'>
				<img src={product?.images.find((img) => img.isMain)?.url || ''} />
			</div>
			<div className='product-info-container'>
				<div className='info-header'>
					<p className='name' onClick={() => navigate(PAGES.product(product?.id))}>
						{product?.name}
					</p>
					<p className='price'>R${product?.price.toFixed(2)}</p>
				</div>
				<div className='variant-detail'>
					<p>Tamanho: {product?.size}</p>
					<ColorViewer hex={product?.color.hex} colorName={product?.color.name} />
				</div>
			</div>
			<div className='buttons'>
				<IconButton type='secondary' onClick={onRemoveClick}>
					<img src={IMAGES.xIcon} />
				</IconButton>
			</div>
		</div>
	)
}

export default ProductContainer
