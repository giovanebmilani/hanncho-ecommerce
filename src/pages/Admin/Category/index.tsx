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
import Loader from '../../../components/Loader'
import ConfirmationModal from '../../../components/ConfirmationModal'
import IMAGES from '../../../utils/constants/images'

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

	const onDeleteClick = (category: CategoryDto) => {
		setModalContent?.(
			<ConfirmationModal
				title='Deletar categoria?'
				text={`Tem certeza que deseja deletar a categoria ${category.name}?`}
				confirmHandler={() => setIdToDelete(category.id)}
			/>
		)
		setVisibility?.(true)
	}

	const onBackClick = () => {
		navigate(PAGES.admin)
	}

	const isAddButtonDisabled = isLoading || isDeleteLoading

	return (
		<div className='category-dashboard-container'>
			<div className='content'>
				<TextButton type='secondary' onClick={onBackClick}>
					VOLTAR
				</TextButton>
				<p className='title'>Categorias</p>
				<div className='row-wrapper'>
					<div className='category-list'>
						{isLoading || isDeleteLoading ? (
							<Loader />
						) : (
							categories.map((category, index) => (
								<div key={index} className='category-list-item'>
									<div className='left-content'>
										<p>{category.id}</p>
									</div>
									<div className='middle-content'>
										<p>{category.name}</p>
									</div>
									<div className='right-content'>
										<IconButton onClick={() => onEditClick(category)}>
											<img src={IMAGES.editIcon} />
										</IconButton>
										<IconButton onClick={() => onDeleteClick(category)}>
											<img src={IMAGES.trashIcon} />
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

export default CategoryDashboard
