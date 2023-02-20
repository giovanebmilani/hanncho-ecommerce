import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AsideModal from '../components/AsideModal'
import Blur from '../components/Blur'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Layout from '../components/Layout'
import Modal from '../components/Modal'
import Toast from '../components/Toast'
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
						return (
							<Route
								key={index}
								path={route.path}
								element={
									<>
										{element}
										{route.footerEnabled && <Footer />}
									</>
								}
							/>
						)
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
			<Blur />
			<Modal />
			<AsideModal />
			<Toast />
		</BrowserRouter>
	)
}
export default Router
