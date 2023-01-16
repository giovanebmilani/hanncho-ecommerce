import React, { ReactNode } from 'react'
import './index.scss'

export interface LayoutProps {
	children?: ReactNode
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
	return <div className={'layout-container'}>{children}</div>
}

export default Layout
