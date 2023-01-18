import './index.scss'
import React, { useEffect, useState } from 'react'
import { useModal } from '../../providers/Modal/ModalProvider'
import Button from '../Button'

export interface ConfirmationModalProps {
	title?: string
	text?: string
	confirmButtonText?: string
	cancelButtonText?: string
	confirmHandler?: () => void
	cancelHandler?: () => void
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
	title,
	text,
	confirmButtonText,
	cancelButtonText,
	confirmHandler,
	cancelHandler
}) => {
	const { setVisibility } = useModal()

	const handleConfirmClick = () => {
		if (confirmHandler) confirmHandler()
		setVisibility?.(false)
	}

	const handleCancelClick = () => {
		if (cancelHandler) cancelHandler()
		setVisibility?.(false)
	}

	return (
		<div className={'confirmation-modal'}>
			<p className='title'>{title || 'Aviso'}</p>
			<p>{text}</p>
			<div className='buttons'>
				<Button type='danger' onClick={handleCancelClick}>
					{cancelButtonText || 'CANCELAR'}
				</Button>

				<Button type='primary' onClick={handleConfirmClick}>
					{confirmButtonText || 'CONFIRMAR'}
				</Button>
			</div>
		</div>
	)
}

export default ConfirmationModal
