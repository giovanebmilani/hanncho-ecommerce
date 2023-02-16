const PAGES = {
	home: '/',
	login: '/login',
	admin: '/admin',
	color: '/admin/cores',
	category: '/admin/categorias',
	collection: '/admin/colecoes',
	adminProduct: '/admin/produtos',
	stock: (id: string | number = ':productId') => `/admin/${id}/estoque`,
	shop: '/loja',
	product: (id: string | number = ':productId') => `/produto/${id}`,
	cart: '/carrinho'
}

export default PAGES
