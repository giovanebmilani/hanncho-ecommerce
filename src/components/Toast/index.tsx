import './index.scss'
import React from 'react'
import { useToast } from '../../providers/Toast/ToastProvider'
import IMAGES from '../../utils/constants/images'

export const Toast: React.FC = () => {
	const { toastVisibility, closeToast, toastContent, toastType } = useToast()

	const onCloseClick = () => {
		closeToast?.()
	}

	return (
		<div className={`toast-container ${toastType} ${toastVisibility ? '' : 'hidden'}`}>
			<div className='type-bar'></div>
			<div className='toast-content'>{toastContent}</div>
			<div className='close-button' onClick={onCloseClick}>
				<img src={IMAGES.xIcon} />
			</div>
		</div>
	)
}

export default Toast
