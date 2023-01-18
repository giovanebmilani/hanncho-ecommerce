import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../providers/Auth/AuthProvider'
import PAGES from '../utils/constants/pages'

export interface ProtectedRouteProps {
	children: JSX.Element
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
	const { isLogged } = useAuth()

	const canAccess = isLogged?.()

	if (!canAccess) return <Navigate to={PAGES.login} />
	return children
}
