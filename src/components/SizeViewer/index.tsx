import './index.scss'
import React, { ReactNode } from 'react'

export interface ColorViewerProps {
	children?: ReactNode
	onClick?: VoidFunction
	hex?: string
	disabled?: boolean
	selected?: boolean
}

export const SizeViewer: React.FC<ColorViewerProps> = ({
	children,
	onClick,
	disabled = false,
	selected = false
}) => {
	return (
		<button
			className={`size-viewer-container ${onClick ? 'clickable' : ''} ${selected ? 'selected' : ''}`}
			onClick={onClick}
			disabled={disabled}
		>
			{children}
		</button>
	)
}

export default SizeViewer
