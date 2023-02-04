import './index.scss'
import Logo from '../Logo'
import TextButton from '../TextButton'
import IconButton from '../IconButton'
import { useNavigate } from 'react-router-dom'
import PAGES from '../../utils/constants/pages'
import IMAGES from '../../utils/constants/images'
import { useEffect, useState } from 'react'
import { useCart } from '../../providers/Cart/CartProvider'

const Header: React.FC = () => {
	const navigate = useNavigate()
	const { products } = useCart()
	const [scrolling, setScrolling] = useState<boolean>(false)

	useEffect(() => {
		document.addEventListener('scroll', () => {
			const scrollPos = window.scrollY

			if (scrollPos > 50) return setScrolling(true)
			setScrolling(false)
		})
	}, [])

	const onLogoClick = () => {
		navigate(PAGES.home)
	}

	const onShopClick = () => {
		navigate(PAGES.shop)
	}

	const onCartClick = () => {
		navigate(PAGES.cart)
	}

	return (
		<div className={`header ${scrolling ? 'scrolling' : ''}`}>
			<div className='left-content'>
				<TextButton type='primary' onClick={onShopClick}>
					LOJA
				</TextButton>
			</div>

			<Logo variant='primary' onClick={onLogoClick} />
			<div className='right-content'>
				{products && products.length > 0 && <div className='cart-products-count-tag'>{products.length}</div>}
				<IconButton onClick={onCartClick}>
					<img src={IMAGES.cartIcon} />
				</IconButton>
			</div>
		</div>
	)
}

export default Header
