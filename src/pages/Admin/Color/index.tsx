import { useEffect, useState } from 'react'
import { useGetAllColors } from '../../../api/admin/color/queries'
import { ColorDto } from '../../../dtos/Color'
import './index.scss'

const ColorDashboard: React.FC = () => {
	const [colors, setColors] = useState<ColorDto[]>([])
	const { isLoading, data } = useGetAllColors()

	useEffect(() => {
		if (!data) return
		setColors(data)
	}, [data])

	return (
		<div className='color-dashboard-container'>
			<div className='content'>
				<p className='title'>Cores</p>
				{colors.map((color, index) => (
					<p key={index}>
						{color.name} - {color.hex}
					</p>
				))}
			</div>
		</div>
	)
}

export default ColorDashboard
