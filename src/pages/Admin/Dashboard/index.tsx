import { useNavigate } from 'react-router-dom'
import Button from '../../../components/Button'
import PAGES from '../../../utils/constants/pages'
import './index.scss'

const Dashboard: React.FC = () => {
	const navigate = useNavigate()

	const onStockClick = () => {
		navigate(PAGES.stock)
	}
	return (
		<div className='dashboard-container'>
			<div className='content'>
				<Button type='secondary' onClick={onStockClick}>
					ESTOQUE
				</Button>
			</div>
		</div>
	)
}

export default Dashboard
