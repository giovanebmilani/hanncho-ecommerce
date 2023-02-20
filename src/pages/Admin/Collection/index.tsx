import './index.scss'

import { useNavigate } from 'react-router-dom'
import PAGES from '../../../utils/constants/pages'
import TextButton from '../../../components/TextButton'
import { useEffect, useState } from 'react'
import IconButton from '../../../components/IconButton'
import Button from '../../../components/Button'
import { useModal } from '../../../providers/Modal/ModalProvider'
import { CollectionModal } from './components/CollectionModal'
import Loader from '../../../components/Loader'
import ConfirmationModal from '../../../components/ConfirmationModal'
import IMAGES from '../../../utils/constants/images'
import { CollectionDto } from '../../../dtos/Collection'
import { useGetAllCollections } from '../../../api/admin/collection/queries'
import { useCollectionDeleteMutation } from '../../../api/admin/collection/mutations'

const CollectionDashboard: React.FC = () => {
	const navigate = useNavigate()
	const [collections, setCollections] = useState<CollectionDto[]>([])
	const [idToDelete, setIdToDelete] = useState<number | undefined>()
	const { setModalContent, setVisibility } = useModal()
	const { isLoading, data } = useGetAllCollections()
	const { isLoading: isDeleteLoading, mutate: deleteMutate } = useCollectionDeleteMutation()

	useEffect(() => {
		if (!data) return
		setCollections(data)
	}, [data])

	useEffect(() => {
		if (!idToDelete) return
		deleteMutate(idToDelete)
	}, [idToDelete])

	const onAddClick = () => {
		setModalContent?.(<CollectionModal />)
		setVisibility?.(true)
	}

	const onEditClick = (collection: CollectionDto) => {
		setModalContent?.(<CollectionModal collection={collection} isEdit />)
		setVisibility?.(true)
	}

	const onDeleteClick = (collection: CollectionDto) => {
		setModalContent?.(
			<ConfirmationModal
				title='Deletar coleção?'
				text={`Tem certeza que deseja deletar a coleção ${collection.name}?`}
				confirmHandler={() => setIdToDelete(collection.id)}
			/>
		)
		setVisibility?.(true)
	}

	const onBackClick = () => {
		navigate(PAGES.admin)
	}

	const isAddButtonDisabled = isLoading || isDeleteLoading

	return (
		<div className='collection-dashboard-container'>
			<div className='content'>
				<TextButton type='secondary' onClick={onBackClick}>
					VOLTAR
				</TextButton>
				<p className='title'>Coleções</p>
				<div className='row-wrapper'>
					<div className='collection-list'>
						{isLoading || isDeleteLoading ? (
							<Loader />
						) : (
							collections.map((collection, index) => (
								<div key={index} className='category-list-item'>
									<div className='left-content'>
										<p>{collection.id}</p>
									</div>
									<div className='middle-content'>
										<p>{collection.name}</p>
									</div>
									<div className='right-content'>
										<IconButton onClick={() => onEditClick(collection)} helperLabel='Editar'>
											<img src={IMAGES.editIcon} />
										</IconButton>
										<IconButton onClick={() => onDeleteClick(collection)} helperLabel='Excluir'>
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

export default CollectionDashboard
