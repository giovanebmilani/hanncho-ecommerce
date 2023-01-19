import React from 'react'
import IMAGES from '../../utils/constants/images'
import './index.scss'

export interface LogoProps {
	onClick?: VoidFunction
	variant?: 'primary' | 'secondary'
}

const Logo: React.FC<LogoProps> = ({ variant = 'primary', onClick }) => {
	return (
		<button className={`logo ${variant}`} onClick={onClick}>
			<img src={IMAGES.mainLogo} />
		</button>
	)
}

export default Logo
