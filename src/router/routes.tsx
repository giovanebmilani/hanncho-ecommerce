import { RouteProps } from 'react-router-dom'
import PAGES from '../utils/constants/pages'
import Home from '../pages/Home'
import Login from '../pages/Login'

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
		component: <Login />,
		path: PAGES.login,
		requireAuth: false
	}
]
