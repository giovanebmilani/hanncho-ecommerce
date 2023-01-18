import './index.scss'
import React, { ReactNode } from 'react'

export interface ColorViewerProps {
	children?: ReactNode
	onClick?: VoidFunction
	hex?: string
	disabled?: boolean
}

export const ColorViewer: React.FC<ColorViewerProps> = ({
	children,
	onClick,
	hex = 'fff',
	disabled = false
}) => {
	return (
		<button
			style={{ backgroundColor: `#${hex}` }}
			className={'color-viewer-container'}
			onClick={onClick}
			disabled={disabled}
		>
			{children}
		</button>
	)
}

export default ColorViewer
