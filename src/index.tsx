import './sass/index.scss'
import React from 'react'
import ReactDOM from 'react-dom/client'
import reportWebVitals from './reportWebVitals'
import Router from './router'
import { QueryClientProvider } from 'react-query'
import { queryClient } from './api/query-client'
import { AuthProvider } from './providers/Auth/AuthProvider'
import { ModalProvider } from './providers/Modal/ModalProvider'
import { BlurProvider } from './providers/Blur/BlurProvider'
import { AsideModalProvider } from './providers/AsideModal/AsideModalProvider'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<AuthProvider>
				<BlurProvider>
					<AsideModalProvider>
						<ModalProvider>
							<Router />
						</ModalProvider>
					</AsideModalProvider>
				</BlurProvider>
			</AuthProvider>
		</QueryClientProvider>
	</React.StrictMode>
)

//If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
