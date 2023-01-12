import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { routes } from './routes'

const Router: React.FC = () => {
	return (
		<BrowserRouter>
			<Routes>
				{routes.map((route, index) => (
					<Route key={index} path={route.path} element={route.component} />
				))}
			</Routes>
		</BrowserRouter>
	)
}
export default Router
