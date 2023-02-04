import React, { createContext, ReactNode, useContext, useState } from 'react'

type ToastType = 'success' | 'error' | 'neutral'

export interface ToastProviderProps {
	toast: ((message: string, type: 'success' | 'error' | 'neutral') => void) | null
	toastVisibility: boolean
	closeToast: (() => void) | null
	toastContent: string | null
	toastType: ToastType
}

const ToastContext = createContext<ToastProviderProps>({
	toast: null,
	toastVisibility: false,
	closeToast: null,
	toastContent: null,
	toastType: 'neutral'
})

const ToastProvider: React.FC<{ children?: ReactNode }> = ({ children }) => {
	const [toastVisibility, setToastVisibility] = useState<boolean>(false)
	const [toastContent, setToastContent] = useState<string>('')
	const [toastType, setToastType] = useState<ToastType>('neutral')
	const [toastCloseTimeout, setToastCloseTimeout] = useState<NodeJS.Timeout>()

	const toast = (message: string, type: 'success' | 'error' | 'neutral') => {
		setToastContent(message)
		setToastType(type)
		setToastVisibility(true)
		const timeout = setTimeout(() => setToastVisibility(false), 5000)
		setToastCloseTimeout(timeout)
	}

	const closeToast = () => {
		setToastVisibility(false)
		clearTimeout(toastCloseTimeout)
	}

	const value = {
		toastVisibility,
		closeToast,
		toastContent,
		toastType,
		toast
	}

	return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
}

export { ToastProvider }

export function useToast() {
	return useContext(ToastContext)
}