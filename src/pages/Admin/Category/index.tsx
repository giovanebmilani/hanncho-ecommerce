import './index.scss'

import { useNavigate } from 'react-router-dom'
import PAGES from '../../../utils/constants/pages'
import TextButton from '../../../components/TextButton'
import { CategoryDto } from '../../../dtos/Category'
import { useEffect, useState } from 'react'
import { useGetAllCategories } from '../../../api/admin/category/queries'
import IconButton from '../../../components/IconButton'
import Button from '../../../components/Button'
import { useModal } from '../../../providers/Modal/ModalProvider'
import CategoryModal from './components/CategoryModal'
import { useCategoryDeleteMutation } from '../../../api/admin/category/mutations'

const CategoryDashboard: React.FC = () => {
	const navigate = useNavigate()
	const [categories, setCategories] = useState<CategoryDto[]>([])
	const [idToDelete, setIdToDelete] = useState<number | undefined>()
	const { setModalContent, setVisibility } = useModal()
	const { isLoading, data } = useGetAllCategories()
	const { isLoading: isDeleteLoading, mutate: deleteMutate } = useCategoryDeleteMutation()

	useEffect(() => {
		if (!data) return
		setCategories(data)
	}, [data])

	useEffect(() => {
		if (!idToDelete) return
		deleteMutate(idToDelete)
	}, [idToDelete])

	const onAddClick = () => {
		setModalContent?.(<CategoryModal />)
		setVisibility?.(true)
	}

	const onEditClick = (category: CategoryDto) => {
		setModalContent?.(<CategoryModal category={category} isEdit />)
		setVisibility?.(true)
	}

	const onDeleteClick = (id: number) => {
		setIdToDelete(id)
	}

	const onBackClick = () => {
		navigate(PAGES.admin)
	}

	return (
		<div className='category-dashboard-container'>
			<div className='content'>
				<TextButton type='secondary' onClick={onBackClick}>
					VOLTAR
				</TextButton>
				<p className='title'>Categorias</p>
				<div className='row-wrapper'>
					<div className='category-list'>
						{categories.map((category, index) => (
							<div key={index} className='category-list-item'>
								<div className='left-content'>
									<p>{category.id}</p>
								</div>
								<div className='middle-content'>
									<p>{category.name}</p>
								</div>
								<div className='right-content'>
									<IconButton onClick={() => onEditClick(category)}>
										<img src={process.env.PUBLIC_URL + './assets/edit-icon.png'} />
									</IconButton>
									<IconButton onClick={() => onDeleteClick(category.id)}>
										<img src={process.env.PUBLIC_URL + './assets/trash-icon.png'} />
									</IconButton>
								</div>
							</div>
						))}
					</div>
					<div className='buttons'>
						<Button type='primary' onClick={onAddClick} disabled={isDeleteLoading}>
							+ ADICIONAR
						</Button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default CategoryDashboard
