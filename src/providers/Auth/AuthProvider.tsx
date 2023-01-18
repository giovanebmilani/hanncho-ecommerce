import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { useGetSelfAccount } from '../../api/core/account/queries'
import { AccountDto } from '../../dtos/Account'
import authStorage from '../../utils/stores/auth'

interface AuthProviderProps {
	loggedAccount: AccountDto | null
	isLogged: (() => boolean) | null
	setAuthToken: ((token?: string) => void) | null
	logout: (() => void) | null
}

const AuthContext = createContext<AuthProviderProps>({
	loggedAccount: null,
	isLogged: null,
	setAuthToken: null,
	logout: null
})

const AuthProvider: React.FC<{ children?: ReactNode }> = ({ children }) => {
	const [loggedAccount, setLoggedAccount] = useState<AccountDto | null>(null)
	const [token, setToken] = useState<string | undefined>()

	// useEffect(() => {
	// 	if (token) {
	// 		const { data } = useGetSelfAccount()
	// 		console.log(data)
	// 		if (data) setLoggedAccount(data)
	// 	}
	// }, [token])

	const isLogged = () => !!authStorage.getAuthToken()

	const setAuthToken = (token?: string) => {
		setToken(token)
		if (token) {
			authStorage.setAuthToken(token)
		} else {
			authStorage.removeAuthToken()
		}
	}

	const logout = () => {
		authStorage.removeAuthToken()
		window.location.reload()
	}

	const value = {
		loggedAccount,
		isLogged,
		setAuthToken,
		logout
	}

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export { AuthProvider }

export function useAuth() {
	return useContext(AuthContext)
}
