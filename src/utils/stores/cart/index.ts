import { ProductCartDto } from '../../../dtos/Product'
import { STORE_KEYS } from '../../constants/stores'

const getProducts = () => {
	return JSON.parse(localStorage.getItem(STORE_KEYS.cart) || '[]')
}

const setProducts = (products: ProductCartDto[]) => {
	localStorage.setItem(STORE_KEYS.cart, JSON.stringify(products))
}

const clearCart = () => {
	localStorage.removeItem(STORE_KEYS.cart)
}

export default {
	getProducts,
	setProducts,
	clearCart
}
