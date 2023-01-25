import './index.scss'
import React, { ReactNode } from 'react'

export interface IconButtonProps {
	children?: ReactNode
	onClick?: VoidFunction
	type?: 'primary' | 'secondary'
	disabled?: boolean
	helperLabel?: string
}

export const IconButton: React.FC<IconButtonProps> = ({
	children,
	onClick,
	type = 'primary',
	disabled = false,
	helperLabel = ''
}) => {
	return (
		<button className={`icon-button-container ${type}`} onClick={onClick} disabled={disabled}>
			{helperLabel && <div className='helper-label'>{helperLabel}</div>}
			{children}
		</button>
	)
}

export default IconButton
