import React from 'react'
import { useBackground } from '../../providers/Background/BackgroundProvider'
import './index.scss'

export const Gradient: React.FC = () => {
	const { gradientHex } = useBackground()
	return (
		<div
			className={'gradient-container'}
			style={
				gradientHex
					? {
							backgroundImage: `linear-gradient(225deg, #${gradientHex} 0%, #161616 100%)`
					  }
					: {}	
			}
		></div>
	)
}

export default Gradient
