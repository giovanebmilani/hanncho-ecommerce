import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { useBlur } from '../Blur/BlurProvider'

interface AsideModalProviderProps {
	hidden: boolean
	setAsideModalVisibility: ((value: boolean) => void) | null
	content: ReactNode | null
	setAsideModalContent: ((content: ReactNode | null) => void) | null
}

const AsideModalContext = createContext<AsideModalProviderProps>({
	hidden: true,
	setAsideModalVisibility: null,
	content: null,
	setAsideModalContent: null
})

const AsideModalProvider: React.FC<{ children?: ReactNode }> = ({ children }) => {
	const [hidden, setHidden] = useState<boolean>(true)
	const [content, setContent] = useState<ReactNode>(null)
	const { setBlurred } = useBlur()

	useEffect(() => {
		setBlurred?.(!hidden)
	}, [hidden])

	const setAsideModalVisibility = (value: boolean) => {
		setHidden(!value)
	}

	const setAsideModalContent = (content: ReactNode | null) => {
		setContent(content)
	}

	const value = {
		hidden,
		setAsideModalVisibility,
		content,
		setAsideModalContent
	}

	return <AsideModalContext.Provider value={value}>{children}</AsideModalContext.Provider>
}

export { AsideModalProvider }

export function useAsideModal() {
	return useContext(AsideModalContext)
}
