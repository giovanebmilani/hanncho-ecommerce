import './index.scss'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { PublicProductDto } from '../../dtos/Product'
import { usePublicGetProduct } from '../../api/public/product/queries'
import Loader from '../../components/Loader'
import TextButton from '../../components/TextButton'
import PAGES from '../../utils/constants/pages'
import { Size } from '../../dtos/Stock'
import SizeViewer from '../../components/SizeViewer'
import ColorViewer from '../../components/ColorViewer'
import Button from '../../components/Button'

const Product: React.FC = () => {
	const navigate = useNavigate()
	const { productId: productIdParam } = useParams()
	const [productId, setProductId] = useState<number>()
	const [product, setProduct] = useState<PublicProductDto>()

	const { data, isLoading } = usePublicGetProduct(productId)

	useEffect(() => {
		if (!productIdParam) return
		setProductId(parseInt(productIdParam))
	}, [productIdParam])

	useEffect(() => {
		if (!data) return
		setProduct(data)
	}, [data])

	const onBackClick = () => {
		navigate(-1)
	}

	const isInSale = () => product?.basePrice !== product?.price

	return (
		<div className='product-container'>
			<div className='content'>
				<TextButton type='secondary' onClick={onBackClick}>
					VOLTAR
				</TextButton>
				<div className='product-detail-container'>
					<div className='product-images-container'>
						<div className='main-image-container'>
							<img src={product?.images.find((img) => img.isMain)?.url || ''} />
						</div>
						<div className='other-images'>
							{product?.images
								.filter((img) => !img.isMain)
								.map((img, index) => (
									<img key={index} src={img.url} />
								))}
						</div>
					</div>
					<div className='product-info-container'>
						<div className='infos'>
							<p className='title'>{product?.name}</p>
							<div className='product-price-container'>
								{isInSale() && <p className='base-price'>R${product?.basePrice.toFixed(2)}</p>}
								<p className='price'>R${product?.price.toFixed(2)}</p>
							</div>
							<p>{product?.description}</p>
						</div>
						<div className='product-sizes-container'>
							<p className='title'>Selecione o tamanho:</p>
							<div className='sizes'>
								{product?.avaliableSizes.map((size, index) => (
									<SizeViewer key={index}>{size}</SizeViewer>
								))}
							</div>
						</div>
						<div className='other-colors-container'>
							<p className='title'>Outras cores:</p>
							<div className='colors'>
								{product?.variants.map((variant, index) => (
									<ColorViewer key={index} hex={variant.color.hex} />
								))}
							</div>
						</div>
						<div className='buttons'>
							<Button>COMPRAR</Button>
							<Button type='secondary'>+ CARRINHO</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Product
