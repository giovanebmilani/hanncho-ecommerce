import React from 'react'
import { BrowserRouter } from 'react-router-dom'

const Router: React.FC = () => {
	const teste = 'teste'
	return (
		<BrowserRouter>
			<>{teste}</>
		</BrowserRouter>
	)
}
export default Router
