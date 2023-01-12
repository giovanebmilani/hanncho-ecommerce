import './index.scss'
import React, { ReactNode } from 'react'

export interface TextButtonProps {
	children?: ReactNode
	onClick?: VoidFunction
	type?: 'primary' | 'secondary'
	disabled?: boolean
}

export const TextButton: React.FC<TextButtonProps> = ({
	children,
	onClick,
	type = 'primary',
	disabled = false
}) => {
	return (
		<button className={`text-button-container ${type}`} onClick={onClick} disabled={disabled}>
			{children}
		</button>
	)
}

export default TextButton
