import React, { createContext, ReactNode, useContext, useState } from 'react'

interface BackgroundProviderProps {
	gradientHex?: string
	setGradientWith: ((hex?: string) => void) | null
}

const BackgroundContext = createContext<BackgroundProviderProps>({
	setGradientWith: null
})

const BackgroundProvider: React.FC<{ children?: ReactNode }> = ({ children }) => {
	const [gradientHex, setGradientHex] = useState<string | undefined>()

	const setGradientWith = (hex?: string) => {
		setGradientHex(hex)
	}

	const value = {
		gradientHex,
		setGradientWith
	}

	return <BackgroundContext.Provider value={value}>{children}</BackgroundContext.Provider>
}

export { BackgroundProvider }

export function useBackground() {
	return useContext(BackgroundContext)
}
