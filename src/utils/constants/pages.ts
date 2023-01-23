const PAGES = {
	home: '/',
	login: '/login',
	admin: '/admin',
	color: '/admin/cores',
	category: '/admin/categorias',
	adminProduct: '/admin/produtos',
	stock: (id: string | number = ':productId') => `/admin/${id}/estoque`,
	shop: '/loja',
	cart: '/carrinho'
}

export default PAGES
