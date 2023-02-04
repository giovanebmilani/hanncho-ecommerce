import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { queryClient } from '../../api/query-client'
import { ProductCartDto, PublicProductDto } from '../../dtos/Product'
import QUERY_KEYS from '../../utils/constants/queries'
import cartStorage from '../../utils/stores/cart'

interface CartProviderProps {
	products: ProductCartDto[] | null
	addProduct: ((product?: PublicProductDto) => void) | null
	removeProduct: ((productId: number, size?: string) => void) | null
	clearCart: (() => void) | null
}

const CartContext = createContext<CartProviderProps>({
	products: null,
	addProduct: null,
	removeProduct: null,
	clearCart: null
})

const CartProvider: React.FC<{ children?: ReactNode }> = ({ children }) => {
	const [products, setProducts] = useState<ProductCartDto[]>([])

	useEffect(() => {
		setProducts(cartStorage.getProducts())
	}, [])

	useEffect(() => {
		if (products.length <= 0) return
		queryClient.invalidateQueries(QUERY_KEYS.product)
		cartStorage.setProducts(products)
	}, [products])

	const addProduct = (product?: PublicProductDto) => {
		if (!product) return
		if (products.find((p) => p.id === product.id && p.size === product.size)) return
		setProducts((prev) => [...prev, { id: product.id, size: product.size, quantity: 1 }])
	}

	const removeProduct = (productId?: number, size?: string) => {
		const oldProducts = [...products]
		const newProducts = oldProducts.filter((p) => !(p.id === productId && p.size === size))
		if (newProducts.length <= 0) return clearCart()
		setProducts(newProducts)
	}

	const clearCart = () => {
		setProducts([])
		cartStorage.clearCart()
	}

	const value = {
		products,
		addProduct,
		removeProduct,
		clearCart
	}

	return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export { CartProvider }

export function useCart() {
	return useContext(CartContext)
}
