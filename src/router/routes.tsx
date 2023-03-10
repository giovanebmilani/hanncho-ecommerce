import { RouteProps } from 'react-router-dom'
import PAGES from '../utils/constants/pages'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Dashboard from '../pages/Admin/Dashboard'
import Stock from '../pages/Admin/Stock'
import ColorDashboard from '../pages/Admin/Color'
import CategoryDashboard from '../pages/Admin/Category'
import ProductDashboard from '../pages/Admin/Product'
import Shop from '../pages/Shop'
import Product from '../pages/Product'
import Cart from '../pages/Cart'
import CollectionDashboard from '../pages/Admin/Collection'

export interface RouteConfig extends Omit<RouteProps, 'component'> {
	requireAuth?: boolean
	component: JSX.Element
}

export const routes: RouteConfig[] = [
	{
		component: <Home />,
		path: PAGES.home,
		requireAuth: false
	},
	{
		component: <Shop />,
		path: PAGES.shop,
		requireAuth: false
	},
	{
		component: <Product />,
		path: PAGES.product(),
		requireAuth: false
	},
	{
		component: <Cart />,
		path: PAGES.cart,
		requireAuth: false
	},
	{
		component: <Login />,
		path: PAGES.login,
		requireAuth: false
	},
	{
		component: <Dashboard />,
		path: PAGES.admin,
		requireAuth: true
	},
	{
		component: <Stock />,
		path: PAGES.stock(),
		requireAuth: true
	},
	{
		component: <ColorDashboard />,
		path: PAGES.color,
		requireAuth: true
	},
	{
		component: <CategoryDashboard />,
		path: PAGES.category,
		requireAuth: true
	},
	{
		component: <CollectionDashboard />,
		path: PAGES.collection,
		requireAuth: true
	},
	{
		component: <ProductDashboard />,
		path: PAGES.adminProduct,
		requireAuth: true
	}
]
