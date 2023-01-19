import './index.scss'
import React, { useEffect } from 'react'
import { useModal } from '../../providers/Modal/ModalProvider'

export const Modal: React.FC = () => {
	const { hidden, content, setVisibility } = useModal()

	useEffect(() => {
		window.addEventListener('keydown', (e) => {
			if (e.key === 'Escape') setVisibility?.(false)
		})
	}, [])

	return <div className={`modal-container ${hidden ? 'hidden' : ''}`}>{content}</div>
}

export default Modal
