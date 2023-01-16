import './index.scss'
import { useEffect, useState } from 'react'
import Button from '../../components/Button'
import Input from '../../components/Input'
import { useNavigate } from 'react-router-dom'
import PAGES from '../../utils/constants/pages'
import { useLoginMutation } from '../../api/core/account/mutations'
import { useAuth } from '../../providers/auth/AuthProvider'

const Login: React.FC = () => {
	const navigate = useNavigate()
	const [username, setUsername] = useState<string>('')
	const [password, setPassword] = useState<string>('')
	const { setAuthToken, isLogged } = useAuth()
	const { isLoading, data, mutate } = useLoginMutation({ username, password })

	useEffect(() => {
		if (isLogged?.()) navigate(PAGES.admin)
	}, [isLogged])

	useEffect(() => {
		if (!data) return
		setAuthToken?.(data.token)
		navigate(PAGES.admin)
	}, [data])

	const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUsername(e.target.value)
	}

	const handlePasswordChange = (e?: React.ChangeEvent<HTMLInputElement>) => {
		if (!e) return
		setPassword(e.target.value)
	}

	const isLoginButtonDisabled = isLoading || !username || !password

	return (
		<div className='login-container'>
			<div className='content'>
				<h1 className='title'>Acesse como administrador:</h1>
				<div className='inputs'>
					<Input label='USUÁRIO' value={username} onChange={handleUsernameChange} />
					<Input label='SENHA' type='password' value={password} onChange={handlePasswordChange} />
				</div>
				<div className='buttons'>
					<Button type='primary' disabled={isLoginButtonDisabled} onClick={mutate}>
						ACESSAR
					</Button>
				</div>
			</div>
		</div>
	)
}

export default Login
