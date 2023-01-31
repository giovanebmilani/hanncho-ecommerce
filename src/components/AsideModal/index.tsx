import './index.scss'
import React, { useEffect } from 'react'
import { useAsideModal } from '../../providers/AsideModal/AsideModalProvider'

export const AsideModal: React.FC = () => {
	const { hidden, content, setAsideModalVisibility } = useAsideModal()

	useEffect(() => {
		window.addEventListener('keydown', (e) => {
			if (e.key === 'Escape') setAsideModalVisibility?.(false)
		})
	}, [])

	return <div className={`aside-modal-container ${hidden ? 'hidden' : ''}`}>{content}</div>
}

export default AsideModal
