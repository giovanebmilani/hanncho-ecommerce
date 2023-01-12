import './index.scss'
import React, { ReactNode } from 'react'

export interface IconButtonProps {
	children?: ReactNode
	onClick?: VoidFunction
	type?: 'primary' | 'secondary'
	disabled?: boolean
}

export const IconButton: React.FC<IconButtonProps> = ({
	children,
	onClick,
	type = 'primary',
	disabled = false
}) => {
	return (
		<button className={`icon-button-container ${type}`} onClick={onClick} disabled={disabled}>
			{children}
		</button>
	)
}

export default IconButton
