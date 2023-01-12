import './index.scss'
import Logo from '../Logo'
import TextButton from '../TextButton'
import IconButton from '../IconButton'
import { useNavigate } from 'react-router-dom'
import PAGES from '../../utils/constants/pages'

const Header: React.FC = () => {
	const navigate = useNavigate()

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
		<div className='header'>
			<div className='left-content'>
				<TextButton type='primary' onClick={onShopClick}>LOJA</TextButton>
			</div>

			<Logo variant='primary' onClick={onLogoClick} />
			<div className='right-content'>
				<IconButton onClick={onCartClick}>
					<img src={process.env.PUBLIC_URL + './assets/cart-icon.png'}/>
				</IconButton>
			</div>
		</div>
	)
}

export default Header
