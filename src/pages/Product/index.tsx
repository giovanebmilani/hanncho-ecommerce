import './index.scss'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { PublicProductDto } from '../../dtos/Product'
import { usePublicGetProduct } from '../../api/public/product/queries'
import TextButton from '../../components/TextButton'
import SizeViewer from '../../components/SizeViewer'
import ColorViewer from '../../components/ColorViewer'
import Button from '../../components/Button'
import PAGES from '../../utils/constants/pages'
import Loader from '../../components/Loader'
import { useCart } from '../../providers/Cart/CartProvider'
import { useToast } from '../../providers/Toast/ToastProvider'

const Product: React.FC = () => {
	const navigate = useNavigate()
	const { toast } = useToast()
	const { addProduct, products } = useCart()
	const { productId: productIdParam } = useParams()
	const [productId, setProductId] = useState<number>()
	const [product, setProduct] = useState<PublicProductDto>()
	const [selectedSize, setSelectedSize] = useState<string>()

	const { data, isLoading } = usePublicGetProduct(productId)

	useEffect(() => {
		setSelectedSize(undefined)
	}, [productId])

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

	const onCartAddClick = (product?: PublicProductDto, size?: string) => {
		if (!product || !size) return
		product.size = size
		addProduct?.(product)
		toast?.('Produto adicionado no carrinho.', 'neutral')
	}

	const isInSale = () => product?.basePrice !== product?.price

	const isButtonsDisabled = !selectedSize

	const isProductInCart = !!products?.find(
		(prod) => prod.id === productId && selectedSize === prod.size
	)

	return (
		<div className='product-container'>
			{/* {product && <ProductStructureData product={product} />} */}
			<div className='content'>
				<TextButton type='secondary' onClick={onBackClick}>
					VOLTAR
				</TextButton>
				{isLoading ? (
					<Loader />
				) : (
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
									{product?.avaliableSizes && product.avaliableSizes.length <= 0 ? (
										<p>SOLD OUT</p>
									) : (
										product?.avaliableSizes.map((size, index) => (
											<SizeViewer
												key={index}
												onClick={() => setSelectedSize(size)}
												selected={selectedSize === size}
											>
												{size}
											</SizeViewer>
										))
									)}
								</div>
							</div>
							<div className='other-colors-container'>
								<p className='title'>Outras cores:</p>
								<div className='colors'>
									{product?.variants
										.filter((variant) => variant.id !== productId)
										.map((variant, index) => (
											<ColorViewer
												key={index}
												hex={variant.color.hex}
												colorName={variant.color.name}
												selected={variant.id === productId}
												onClick={() => {
													navigate(PAGES.product(variant.id))
												}}
											/>
										))}
								</div>
							</div>
							<div className='buttons'>
								{/* <Button disabled={isButtonsDisabled}>COMPRAR</Button> */}
								<Button
									onClick={
										isProductInCart ? undefined : () => onCartAddClick(product, selectedSize)
									}
									disabled={isButtonsDisabled}
									type={isProductInCart ? 'primary' : 'secondary'}
								>
									{isProductInCart ? '👌 NO CARRINHO' : '+ CARRINHO'}
								</Button>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	)
}

export default Product
