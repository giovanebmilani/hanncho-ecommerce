import { useNavigate } from 'react-router-dom'
import Button from '../../../components/Button'
import ConfirmationModal from '../../../components/ConfirmationModal'
import TextButton from '../../../components/TextButton'
import { useAuth } from '../../../providers/Auth/AuthProvider'
import { useModal } from '../../../providers/Modal/ModalProvider'
import PAGES from '../../../utils/constants/pages'
import './index.scss'

const Dashboard: React.FC = () => {
	const navigate = useNavigate()
	const { setVisibility, setModalContent } = useModal()
	const { logout } = useAuth()

	const handleLogout = () => {
		setVisibility?.(false)
		logout?.()
	}

	const onLogoutClick = () => {
		setModalContent?.(
			<ConfirmationModal
				title='Sair da conta?'
				confirmButtonText='SIM'
				cancelButtonText='NÃO'
				confirmHandler={handleLogout}
			/>
		)
		setVisibility?.(true)
	}

	const onProductClick = () => {
		navigate(PAGES.adminProduct)
	}

	const onColorClick = () => {
		navigate(PAGES.color)
	}

	const onCategoryClick = () => {
		navigate(PAGES.category)
	}

	return (
		<div className='dashboard-container'>
			<div className='content'>
				<TextButton type='secondary' onClick={onLogoutClick}>
					SAIR
				</TextButton>
				<p className='title'>Dashboard</p>
				<div className='buttons'>
					<Button type='primary' onClick={onProductClick}>
						PRODUTOS
					</Button>
					<Button type='secondary' onClick={onColorClick}>
						CORES
					</Button>
					<Button type='tertiary' onClick={onCategoryClick}>
						CATEGORIAS
					</Button>
				</div>
			</div>
		</div>
	)
}

export default Dashboard
