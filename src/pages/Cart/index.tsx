import './index.scss'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import TextButton from '../../components/TextButton'
import Button from '../../components/Button'
import { useCart } from '../../providers/Cart/CartProvider'
import ProductContainer from './components/ProductContainer'
import PAGES from '../../utils/constants/pages'
import { usePublicGetCartProducts } from '../../api/public/product/queries'
import { PublicProductDto } from '../../dtos/Product'
import { whatsapp } from '../../utils/whatsapp'

const Cart: React.FC = () => {
	const navigate = useNavigate()
	const { products: cartProducts } = useCart()
	const results = usePublicGetCartProducts(cartProducts || [])

	const products = results
		.map((res) => res.data)
		.filter((value) => value !== undefined) as PublicProductDto[]

	const onBackClick = () => {
		navigate(-1)
	}

	const generateOrderMessage = (products: PublicProductDto[]) => {
		let message = 'Olá gostaria de realizar o pedido:%0a'
		for (const prod of products) {
			message = message.concat(
				`- ${prod.name} ${prod.color.name} (TAM:${prod.size}) (id${prod.id})%0a`
			)
		}
		message = message.concat(
			`%0aTotal do meu pedido: R$${products
				?.reduce((prev, current) => prev + current.price, 0)
				.toFixed(2)}`
		)
		return message
	}

	const finishOrder = () => {
		const url = whatsapp.getMessageUrl(generateOrderMessage(products))
		const whatsAppWindow = window.open(url)
		if (!whatsAppWindow) return
		whatsAppWindow.focus()
	}

	return (
		<div className='cart-container'>
			<div className='content'>
				<TextButton type='secondary' onClick={onBackClick}>
					VOLTAR
				</TextButton>
				<div className='title-container'>
					<p className='title'>Seu Carrinho</p>
					<p className='cart-total'>
						R${products?.reduce((prev, current) => prev + current.price, 0).toFixed(2)}
					</p>
				</div>
				<div className='cart-detail-container'>
					<div className='cart-list-container'>
						{products && products?.length <= 0 ? (
							<p>
								Nenhum produto no carrinho... <Link to={PAGES.shop}>Voltar à Loja</Link>
							</p>
						) : (
							products?.map((prod, index) => <ProductContainer key={index} product={prod} />)
						)}
					</div>
					<div className='cart-info-container'>
						<div className='resume'>
							<p className='title'>Resumo do pedido</p>
							<div className='price-detail'>
								<div className='value-row'>
									<p>Produtos</p>
									<p>
										R${products?.reduce((prev, current) => prev + current.basePrice, 0).toFixed(2)}
									</p>
								</div>
								<div className='value-row'>
									<p>Descontos</p>
									<p>
										R$
										{products
											?.reduce((prev, current) => prev + (current.basePrice - current.price), 0)
											.toFixed(2)}
									</p>
								</div>
								<div className='value-row total'>
									<p>TOTAL</p>
									<p>R${products?.reduce((prev, current) => prev + current.price, 0).toFixed(2)}</p>
								</div>
							</div>
						</div>

						<div className='finish-container'>
							<p>Entre em contato para finalizar o pedido</p>
							<Button onClick={finishOrder}>FINALIZAR O PEDIDO PELO WHATSAPP</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Cart
