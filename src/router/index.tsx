import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from '../components/Header'
import Layout from '../components/Layout'
import { ProtectedRoute } from './ProtectedRoute'
import { routes } from './routes'

const Router: React.FC = () => {
	return (
		<BrowserRouter>
			<Layout>
				<Header />
				<Routes>
					{routes.map((route, index) => {
						const element = route.requireAuth ? (
							<ProtectedRoute {...route}>{route.component}</ProtectedRoute>
						) : (
							route.component
						)
						return <Route key={index} path={route.path} element={element} />
						// if (!route.requireAuth)
						// 	return <Route key={index} path={route.path} element={route.component} />
						// return (
						// 	<ProtectedRoute key={index} {...route}>
						// 		{route.component}
						// 	</ProtectedRoute>
						// )
					})}
				</Routes>
			</Layout>
		</BrowserRouter>
	)
}
export default Router
