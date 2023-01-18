import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react'

interface BlurProviderProps {
	blurred: boolean
	setBlurred: ((value: boolean) => void) | null
}

const BlurContext = createContext<BlurProviderProps>({
	blurred: false,
	setBlurred: null
})

const BlurProvider: React.FC<{ children?: ReactNode }> = ({ children }) => {
	const [isBlurred, setIsBlurred] = useState<boolean>(false)

	useEffect(() => {
		if (isBlurred) document.body.style.overflow = 'hidden'
		else document.body.style.overflow = 'unset'
	}, [isBlurred])

	const setBlurred = (value: boolean) => {
		setIsBlurred(value)
	}

	const value = {
		blurred: isBlurred,
		setBlurred
	}

	return <BlurContext.Provider value={value}>{children}</BlurContext.Provider>
}

export { BlurProvider }

export function useBlur() {
	return useContext(BlurContext)
}
