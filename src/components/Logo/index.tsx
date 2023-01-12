import React from 'react'
import './index.scss'

export interface LogoProps {
	onClick?: VoidFunction
	variant?: 'primary' | 'secondary'
}

const Logo: React.FC<LogoProps> = ({ variant = 'primary', onClick }) => {
	return (
		<button className={`logo ${variant}`} onClick={onClick}>
			<img src={process.env.PUBLIC_URL + './assets/logo.png'} />
		</button>
	)
}

export default Logo
