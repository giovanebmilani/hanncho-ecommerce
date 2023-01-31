import React, { ReactNode } from 'react'
import './index.scss'

export interface ButtonProps {
	children?: ReactNode
	onClick?: VoidFunction
	type?: 'primary' | 'secondary' | 'tertiary' | 'danger'
	disabled?: boolean
	animating?: boolean
}

export const Button: React.FC<ButtonProps> = ({
	children,
	onClick,
	type = 'primary',
	disabled = false,
	animating = false
}) => {
	return (
		<button
			className={`button-container ${type} ${animating ? 'animating' : ''}`}
			onClick={onClick}
			disabled={disabled}
		>
			{children}
		</button>
	)
}

export default Button
