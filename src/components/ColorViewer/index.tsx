import './index.scss'
import React, { ReactNode } from 'react'

export interface ColorViewerProps {
	children?: ReactNode
	onClick?: VoidFunction
	colorName?: string
	hex?: string[]
	disabled?: boolean
	selected?: boolean
}

{
	/* <div
			className={'gradient-container'}
			style={
				gradientHex
					? {
							backgroundImage: `linear-gradient(180deg, #${gradientHex} 0%, #161616 100%)`
					  }
					: {}	
			}
		></div> */
}

export const ColorViewer: React.FC<ColorViewerProps> = ({
	children,
	onClick,
	colorName,
	hex = 'fff',
	disabled = false,
	selected = false
}) => {
	const getStyle = () => {
		if (hex.length === 1) return { backgroundColor: `#${hex[0]}` }
		if (hex.length === 2)
			return { backgroundImage: `linear-gradient(90deg, #${hex[0]} 0%, #${hex[1]} 100%)` }
		return {
			backgroundImage: `linear-gradient(90deg, #${hex[0]} 0%, #${hex[1]} 50%, #${hex[2]} 100%)`
		}
	}

	return (
		<button
			style={getStyle()}
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
