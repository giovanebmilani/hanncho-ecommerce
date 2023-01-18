import './index.scss'
import React from 'react'
import { useBlur } from '../../providers/Blur/BlurProvider'

export const Blur: React.FC = () => {
	const { blurred } = useBlur()
	return <div className={`blur ${blurred ? '' : 'hidden'}`}></div>
}

export default Blur
