import { useEffect, useState } from 'react'
import { useGetAllColors } from '../../../api/admin/color/queries'
import Button from '../../../components/Button'
import ColorViewer from '../../../components/ColorViewer'
import IconButton from '../../../components/IconButton'
import { ColorDto } from '../../../dtos/Color'
import './index.scss'

const ColorDashboard: React.FC = () => {
	const [colors, setColors] = useState<ColorDto[]>([])
	const { isLoading, data } = useGetAllColors()

	useEffect(() => {
		if (!data) return
		setColors(data)
	}, [data])

	const onAddClick = () => {
		console.log('add')
	}

	const onEditClick = () => {
		console.log('edit')
	}

	const onDeleteClick = () => {
		console.log('delete')
	}

	return (
		<div className='color-dashboard-container'>
			<div className='content'>
				<p className='title'>Cores</p>
				<div className='row-wrapper'>
					<div className='color-list'>
						{colors.map((color, index) => (
							<div key={index} className='color-list-item'>
								<div className='left-content'>
									<ColorViewer hex={color.hex} />
								</div>
								<div className='middle-content'>
									<p>{color.name}</p>
								</div>
								<div className='right-content'>
									<IconButton onClick={onEditClick}>
										<img src={process.env.PUBLIC_URL + './assets/edit-icon.png'} />
									</IconButton>
									<IconButton onClick={onDeleteClick}>
										<img src={process.env.PUBLIC_URL + './assets/trash-icon.png'} />
									</IconButton>
								</div>
							</div>
						))}
					</div>
					<div className='buttons'>
						<Button type='primary' onClick={onAddClick}>
							+ ADICIONAR
						</Button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ColorDashboard
