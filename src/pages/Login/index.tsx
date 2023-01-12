import './index.scss'
import { useState } from 'react'
import Button from '../../components/Button'
import Input from '../../components/Input'
import { useNavigate } from 'react-router-dom'
import PAGES from '../../utils/constants/pages'

const Login: React.FC = () => {
	const navigate = useNavigate()
	const [login, setLogin] = useState<string>('')
	const [password, setPassword] = useState<string>('')

	const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setLogin(e.target.value)
	}

	const handlePasswordChange = (e?: React.ChangeEvent<HTMLInputElement>) => {
		if (!e) return
		setPassword(e.target.value)
	}

	const onLoginClick = () => {
		navigate(PAGES.admin)
	}

	const isLoginButtonDisabled = !login || !password

	return (
		<div className='login-container'>
			<div className='content'>
				<h1 className='title'>Acesse como administrador:</h1>
				<div className='inputs'>
					<Input label='LOGIN' value={login} onChange={handleLoginChange} />
					<Input label='SENHA' type='password' value={password} onChange={handlePasswordChange} />
				</div>
				<div className='buttons'>
					<Button type='primary' disabled={isLoginButtonDisabled} onClick={onLoginClick}>
						ACESSAR
					</Button>
				</div>
			</div>
		</div>
	)
}

export default Login
