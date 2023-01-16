import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from '../components/Header'
import Layout from '../components/Layout'
import { routes } from './routes'

const Router: React.FC = () => {
	return (
		<BrowserRouter>
			<Layout>
				<Header />
				<Routes>
					{routes.map((route, index) => (
						<Route key={index} path={route.path} element={route.component} />
					))}
				</Routes>
			</Layout>
		</BrowserRouter>
	)
}
export default Router
