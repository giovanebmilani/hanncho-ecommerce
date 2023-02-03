import './index.scss'
import React, { ReactNode } from 'react'

export interface ColorViewerProps {
	children?: ReactNode
	onClick?: VoidFunction
	colorName?: string
	hex?: string
	disabled?: boolean
	selected?: boolean
}

export const ColorViewer: React.FC<ColorViewerProps> = ({
	children,
	onClick,
	colorName,
	hex = 'fff',
	disabled = false,
	selected = false
}) => {
	return (
		<button
			style={{ backgroundColor: `#${hex}` }}
			className={`color-viewer-container ${onClick ? 'clickable' : ''} ${
				selected ? 'selected' : ''
			}`}
			onClick={onClick}
			disabled={disabled}
		>
			{colorName && <div className='color-name-tag'>{colorName}</div>}
			{children}
		</button>
	)
}

export default ColorViewer
