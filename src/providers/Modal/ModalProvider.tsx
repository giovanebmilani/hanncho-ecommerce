import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { useBlur } from '../Blur/BlurProvider'

interface ModalProviderProps {
	hidden: boolean
	setVisibility: ((value: boolean) => void) | null
	content: ReactNode | null
	setModalContent: ((content: ReactNode | null) => void) | null
}

const ModalContext = createContext<ModalProviderProps>({
	hidden: true,
	setVisibility: null,
	content: null,
	setModalContent: null
})

const ModalProvider: React.FC<{ children?: ReactNode }> = ({ children }) => {
	const [hidden, setHidden] = useState<boolean>(true)
	const [content, setContent] = useState<ReactNode>(null)
	const { setBlurred } = useBlur()

	useEffect(() => {
		setBlurred?.(!hidden)
	}, [hidden])

	const setVisibility = (value: boolean) => {
		setHidden(!value)
	}

	const setModalContent = (content: ReactNode | null) => {
		setContent(content)
	}

	const value = {
		hidden,
		setVisibility,
		content,
		setModalContent
	}

	return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
}

export { ModalProvider }

export function useModal() {
	return useContext(ModalContext)
}
