import { useState } from 'react'
import Button from '../../components/Button'
import Input from '../../components/Input'
import './index.scss'

const Login: React.FC = () => {
	const [login, setLogin] = useState<string>('')
	const [password, setPassword] = useState<string>('')

	const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setLogin(e.target.value)
	}

	const handlePasswordChange = (e?: React.ChangeEvent<HTMLInputElement>) => {
		if (!e) return
		setPassword(e.target.value)
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
					<Button type='primary' disabled={isLoginButtonDisabled}>
						ACESSAR
					</Button>
				</div>
			</div>
		</div>
	)
}

export default Login
