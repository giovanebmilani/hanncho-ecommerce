import { useNavigate } from 'react-router-dom'
import Button from '../../../components/Button'
import PAGES from '../../../utils/constants/pages'
import './index.scss'

const Dashboard: React.FC = () => {
	const navigate = useNavigate()

	const onStockClick = () => {
		navigate(PAGES.stock)
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
				<p className='title'>Dashboard</p>
				<div className='buttons'>
					<Button type='primary' onClick={onStockClick}>
						ESTOQUE
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
