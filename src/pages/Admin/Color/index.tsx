import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useColorDeleteMutation } from '../../../api/admin/color/mutations'
import { useGetAllColors } from '../../../api/admin/color/queries'
import Button from '../../../components/Button'
import ColorViewer from '../../../components/ColorViewer'
import IconButton from '../../../components/IconButton'
import Loader from '../../../components/Loader'
import TextButton from '../../../components/TextButton'
import { ColorDto } from '../../../dtos/Color'
import { useModal } from '../../../providers/Modal/ModalProvider'
import PAGES from '../../../utils/constants/pages'
import ColorModal from './components/ColorModal'
import './index.scss'

const ColorDashboard: React.FC = () => {
	const navigate = useNavigate()
	const [colors, setColors] = useState<ColorDto[]>([])
	const [idToDelete, setIdToDelete] = useState<number | undefined>()
	const { isLoading, data } = useGetAllColors()
	const { setVisibility, setModalContent } = useModal()
	const { isLoading: isDeleteLoading, mutate: deleteMutate } = useColorDeleteMutation()

	useEffect(() => {
		if (!data) return
		setColors(data)
	}, [data])

	useEffect(() => {
		if (!idToDelete) return
		deleteMutate(idToDelete)
	}, [idToDelete])

	const onAddClick = () => {
		setModalContent?.(<ColorModal />)
		setVisibility?.(true)
	}

	const onEditClick = (color: ColorDto) => {
		setModalContent?.(<ColorModal color={color} isEdit />)
		setVisibility?.(true)
	}

	const onDeleteClick = (id: number) => {
		setIdToDelete(id)
	}

	const onBackClick = () => {
		navigate(PAGES.admin)
	}

	const isAddButtonDisabled = isLoading || isDeleteLoading

	return (
		<div className='color-dashboard-container'>
			<div className='content'>
				<TextButton type='secondary' onClick={onBackClick}>
					VOLTAR
				</TextButton>
				<p className='title'>Cores</p>
				<div className='row-wrapper'>
					<div className='color-list'>
						{isLoading || isDeleteLoading ? (
							<Loader />
						) : (
							colors.map((color, index) => (
								<div key={index} className='color-list-item'>
									<div className='left-content'>
										<ColorViewer hex={color.hex} />
										<p>#{color.hex}</p>
									</div>
									<div className='middle-content'>
										<p>{color.name}</p>
									</div>
									<div className='right-content'>
										<IconButton onClick={() => onEditClick(color)}>
											<img src={process.env.PUBLIC_URL + './assets/edit-icon.png'} />
										</IconButton>
										<IconButton onClick={() => onDeleteClick(color.id)}>
											<img src={process.env.PUBLIC_URL + './assets/trash-icon.png'} />
										</IconButton>
									</div>
								</div>
							))
						)}
					</div>
					<div className='buttons'>
						<Button type='primary' onClick={onAddClick} disabled={isAddButtonDisabled}>
							+ ADICIONAR
						</Button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ColorDashboard
